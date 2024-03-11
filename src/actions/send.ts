import { Page } from "puppeteer";
import * as path from 'path';
import { MessageOptions } from "../types";

export default async function sendMessage(page: Page, options: MessageOptions) {
    if ((!options.message && !options.file) || (options.message && options.file)) {
        throw new Error("Please provide either a message or a file, not both or none.");
    }

    if (options.message) {
        await sendMessageText(page, options.message);
    }

    if (options.file) {
        await sendFile(page, options.file);
    }
}
async function sendMessageText(page: Page, message: string) {
    await page.waitForSelector('#input_line_0');
    await page.type('#input_line_0', message);
    await page.keyboard.press('Enter');
}

async function sendFile(page: Page, filePath: string) {
    await page.waitForSelector("#ztoolbar > div:nth-child(2) > i");
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click('#ztoolbar > div:nth-child(2) > i'),
    ]);
    const absolutePath = path.resolve(filePath);
    await fileChooser.accept([absolutePath]);
}
