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
        let senderName = $(item).find('.card-sender-name span').text().trim();
        // Nếu không tìm thấy tên người gửi, gán mặc định là "Minh"
        if (!senderName) {
            senderName = "Minh";
        }
        return { messageId, content, time , senderName };
    });
    return messages;
}
