import * as cheerio from 'cheerio';
import { Page } from 'puppeteer';

export default async function getAllMessage(page: Page,user : { name: string; bio: string; birth: string; number: string; } | null) {
    const elements = await page.evaluate(() => {
        const elements = document.querySelectorAll('[id*=bb_msg_id_]');
        return Array.from(elements).map(element => element.outerHTML);
    });

    const messages = elements.map((item: string) => {
        const $ = cheerio.load(item);
        const messageId = $('.chat-message').attr('id');
        const content = $('.text').text();
        const time = $('.card-send-time__sendTime').text();
        let senderName = $(item).find('.card-sender-name span').text().trim();

        if (!senderName && user?.name) {
            senderName = user.name
        } else {
            senderName = "Client"
        }
        return { messageId, content, time , senderName };
    });
    return messages;
}
