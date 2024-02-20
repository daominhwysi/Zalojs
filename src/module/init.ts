import puppeteer from 'puppeteer';
import toGroup from './toGroup';

export default async function init(groupName: string, groupId: string) {
    let isLogin = false;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://id.zalo.me/account?continue=https://chat.zalo.me');
        
        page.on("framenavigated", async (frame: any) => {
            const url = frame.url(); // the new url
            if (url.startsWith("https://chat.zalo.me/") && !isLogin) {
                isLogin = true;
                console.log("logined");
                await toGroup(page, "Nhóm hỏi bài", '#group-item-g1778418226826539279');
                // Remove the event listener after the condition is met
                page.off("framenavigated");
            }
        });
        
        return { browser, page };

    } catch (error) {
        console.error('Error during initialization:', error);
        throw error; 
    }
}
