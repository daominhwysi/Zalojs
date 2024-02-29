import { Page } from 'puppeteer';

export default async function captchaBypass(page: Page, callback: Function): Promise<void> {
    await page.setRequestInterception(true);

    page.on('request', async (interceptedRequest : any) => {
        if (interceptedRequest.url().startsWith("https://zcaptcha.zdn.vn")) {
            callback(interceptedRequest.url())
        }
        interceptedRequest.continue();
    });
}
