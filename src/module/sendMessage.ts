export default async function sendMessage(page : any, message : string) {
    await page.waitForSelector('#input_line_0');
    await page.type('#input_line_0', message);
    await page.keyboard.press('Enter');
}