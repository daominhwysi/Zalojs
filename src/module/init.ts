import puppeteer from 'puppeteer';
import toGroup from './toGroup';
import EventEmitter from 'events';
import { Client } from '..';
const eventEmitter = new EventEmitter();
export default async function init(groupName: string, groupId: string, headless : boolean) {
    let isLogin = false;
    try {
        const browser = await puppeteer.launch({headless});
        const page = await browser.newPage();
        await page.goto('https://id.zalo.me/account?continue=https://chat.zalo.me');
        page.on("framenavigated", async (frame: any) => {
            const url = frame.url(); // the new url
            if (url.startsWith("https://chat.zalo.me/") && !isLogin) {
                isLogin = true;
                await toGroup(page, groupName, groupId);
                eventEmitter.emit('initialized')
                page.off("framenavigated");
            }
        });
        
        return { browser, page };

    } catch (error) {
        console.error('Error during initialization:', error);
        throw error; 
    }
}
export { eventEmitter };