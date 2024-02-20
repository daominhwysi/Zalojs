import getAllMessage from './getAllMessage';
import * as cheerio from 'cheerio';

export default async function messageListener(page: any, callback: Function): Promise<void> {
    let firstMessage = true;
    let messageArray : any[] = []; // Khởi tạo mảng rỗng

    await page.setRequestInterception(true);

    page.on('request', async (interceptedRequest : any) => {
        if (interceptedRequest.url().startsWith("https://tt-group-wpa.chat.zalo.me/api/group/deliveredv2")) {
            if(firstMessage){
                messageArray = await getAllMessage(page);
                firstMessage = false;
            } else {
                const getElementsBetweenSelectors = async (startSelector: string, endSelector: string) => {
                    return await page.evaluate((startSelector: string, endSelector: string) => {
                        const startElement = document.querySelector(startSelector) as HTMLElement;
                        const endElement = document.querySelector(endSelector) as HTMLElement;
                
                        if (!startElement || !endElement) {
                            return null;
                        }
                
                        let betweenElements: string[] = [];
                        let currentElement = startElement.nextElementSibling;
                
                        while (currentElement && currentElement !== endElement) {
                            if (currentElement.id && currentElement.id.includes('bb_msg_id_')) {
                                betweenElements.push(currentElement.outerHTML);
                            }
                            currentElement = currentElement.nextElementSibling as HTMLElement;
                        }
                
                        return betweenElements;
                    }, startSelector, endSelector);
                };
                
                const startSelector = '#' + messageArray[messageArray.length - 1].messageId;
                const endSelector = '#ztoolbar';
                
                const elementsBetween = await getElementsBetweenSelectors(startSelector, endSelector);
                
                let newMessages = elementsBetween.map((item : string) => {
                    const $ = cheerio.load(item);
                    const messageId = $('.wrap-message').attr('id');
                    const content = $('span.text').text();
                    const time = $('span.card-send-time__sendTime').text();
                    return { messageId, content, time };
                });

                messageArray = messageArray.concat(newMessages); // Cập nhật giá trị của messageArray
                newMessages = null;
            }
            callback(messageArray[messageArray.length - 1]); // Execute the provided callback function
        }
        interceptedRequest.continue();
    });
}
