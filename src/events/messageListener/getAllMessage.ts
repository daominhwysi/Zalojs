import * as cheerio from 'cheerio';
import { Page } from 'puppeteer';
import { User } from '../../types/user';

export default async function getAllMessage(page: Page, user: User | null) {
    const elements = await page.evaluate(() => {
        const elements = document.querySelectorAll('[id*=bb_msg_id_]');
        return Array.from(elements).map(element => element.outerHTML);
    });

    const messages = elements.map((item: string) => {
        const $ = cheerio.load(item);
        let senderName = "Client"; // Mặc định là "Client"
        const userExists = user && user.name; // Kiểm tra xem user tồn tại và có thuộc tính name không
        if (userExists) {
            senderName = user.name;
        }
        
        // Lấy nội dung và thông tin của tin nhắn
        const messageId = $('.chat-message').attr('id')
        const time = $('.card-send-time__sendTime').text().trim();
        let content: string | string[] | undefined; // Chỉnh sửa kiểu của content
        
        // Tin nhắn hình ảnh
        const imageMessage = $('div.chatImageMessage');
        if (imageMessage.length > 0) {
            const imageSrc = $('img').attr('src');
            content = imageSrc;
        }

        const textMessage = $('div.card--text');
        if (textMessage.length > 0) {
            content = textMessage.find('.text').text().trim() || undefined;
        }
        const emojiElement = $('.emoji-sizer.emoji-outer.larger');

        // Lấy nội dung văn bản (mã emoji)
        
        if(emojiElement.length > 0){
          const emojiCode = emojiElement.text();
          content = emojiCode;
        }
        return { messageId, content, time, senderName };
    });

    return messages;
}
