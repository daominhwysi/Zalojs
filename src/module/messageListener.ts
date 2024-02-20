// messageListener.ts
import puppeteer from 'puppeteer';

export default async function messageListener(page: any, callback: Function): Promise<void> {
    await page.setRequestInterception(true);

    page.on('request', (interceptedRequest : any) => {
        if (interceptedRequest.url().startsWith("https://tt-group-wpa.chat.zalo.me/api/group/deliveredv2")) {
            // A message has been sent
            callback(); // Execute the provided callback function
        }
        interceptedRequest.continue();
    });
}
