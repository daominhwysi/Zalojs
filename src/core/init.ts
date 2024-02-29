import puppeteer from 'puppeteer';
import express, { Request, Response } from 'express';
import { EventEmitter, Server as WebSocketServer } from 'ws';
import path from 'path';
import WebSocket from 'ws'; // Import WebSocket class
import toGroup from '../actions/toGroup';

const eventEmitter = new EventEmitter();

interface InitOptions {
    groupName: string;
    groupSelector: string;
    headless?: boolean;
}

export default async function init(options: InitOptions) {
    const { groupName, groupSelector, headless = true } = options;
    let isLogin = false;


    const app = express();
    const port = 3000;

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Serve static files from the public directory

    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    const wss = new WebSocketServer({ server });

    try {
        const browser = await puppeteer.launch({ headless });
        const page = await browser.newPage();
        await page.goto('https://id.zalo.me/account?continue=https://chat.zalo.me');
        await page.waitForSelector('#app > div > div.zLogin-layout > div.body > div.animated.fadeIn.body-container > div.content.animated.fadeIn > div > div > div.qrcode > div.qr-container > img');
        const imageSrc= await page.evaluate(() => {
            const imgElement = document.querySelector('#app > div > div.zLogin-layout > div.body > div.animated.fadeIn.body-container > div.content.animated.fadeIn > div > div > div.qrcode > div.qr-container > img') as HTMLImageElement
            if (imgElement) {
              return imgElement.src;
            } else {
              return null;
            }
          });
        app.get('/', (req: Request, res: Response) => {
            res.render('index', { imageSrc });
        });

        wss.on('connection', async (ws) => {
            // Handle incoming messages and send data back to clients
            ws.on('message', async (message) => {
                if(message.toString() == 'qrcode'){
                    const element = await page.$('#app > div > div.zLogin-layout > div.body > div.animated.fadeIn.body-container > div.content.animated.fadeIn > div > div > div.qrcode.disabled > div.qrcode-expired > a');

                    if (element) {
                      // Click the element
                      await element.click();
                      console.log('Element clicked successfully.');
                    } else {
                      console.log('Element not found.');
                    }
                }
            });
        });
        page.on('request', request => {
            if (request.url().startsWith('data:image/png;base64')) {
                const imageSrc = request.url();
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(imageSrc);
                    }
                });
            }
        });

        page.on("framenavigated", async (frame: any) => {
            const url = frame.url(); // the new url
            if (url.startsWith("https://chat.zalo.me/") && !isLogin) {
                isLogin = true;
                await toGroup(page, groupName, groupSelector);
                page.off("framenavigated");
                page.removeAllListeners("request");
                eventEmitter.emit('initialized');
            }
        });

        return { browser, page };
    } catch (error) {
        console.error('Error during initialization:', error);
        throw error;
    }
}

export { eventEmitter };
