import * as cheerio from 'cheerio';

export default async function getAllMessage(page: any) {
    const elements = await page.evaluate(() => {
        const elements = document.querySelectorAll('[id*=bb_msg_id_]');
        return Array.from(elements).map(element => element.outerHTML);
    });

    const messages = elements.map((item: string) => {
        const $ = cheerio.load(item);
        const messageId = $('.chat-message').attr('id');
        const content = $('.text').text();
        const time = $('.card-send-time__sendTime').text();

        return { messageId, content, time };
    });
    console.log(messages)
    return messages;
}
