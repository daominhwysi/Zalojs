import { Page, ElementHandle } from "puppeteer";
import * as path from 'path';

export default async function sendImage(page: Page, imagePath: string) {
    // Use path.join() to construct the image pat

    await page.waitForSelector("#ztoolbar > div:nth-child(2) > i");
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click('#ztoolbar > div:nth-child(2) > i'),
    ]);
    await fileChooser.accept([imagePath]);
}
