export default async function sendMessage(page : any, message : string) {
    await page.waitForSelector('#input_line_0');
    await page.type('#input_line_0', message);
    await page.waitForSelector('#chatInputv2 > div > div > div.chat-input-btns > div.z--btn--v2.btn-tertiary-primary.large.send-btn-chatbar.input-btn.--rounded.send-btn-chatbar.input-btn > div');
    await page.click('#chatInputv2 > div > div > div.chat-input-btns > div.z--btn--v2.btn-tertiary-primary.large.send-btn-chatbar.input-btn.--rounded.send-btn-chatbar.input-btn > div');
}