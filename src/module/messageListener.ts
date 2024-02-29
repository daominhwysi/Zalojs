import getAllMessage from './getAllMessage';
import * as cheerio from 'cheerio';
import sendMessage from './sendMessage';
import { Page } from 'puppeteer';

export default async function messageListener(page: Page, callback: Function,user : { name: string; bio: string; birth: string; number: string; } | null): Promise<void> {
    let firstMessage = true;
    let messageArray : any[] = [];

    await page.setRequestInterception(true);

    page.on('request', async (interceptedRequest : any) => {
        if (interceptedRequest.url().startsWith("https://tt-group-wpa.chat.zalo.me/api/group/deliveredv2")) {
            if (firstMessage) {
                messageArray = await getAllMessage(page,user);
                firstMessage = false;
            } else {
                const getElementsBetweenSelectors = async (startSelector: string, endSelector: string): Promise<string[] | null> => {
                    return await page.evaluate((startSelector: string, endSelector: string) => {
                        const startElement = document.querySelector(startSelector);
                        const endElement = document.querySelector(endSelector);

                        if (!startElement || !endElement) {
                            return null;
                        }

                        let betweenElements: string[] = [];
                        let currentElement = startElement.nextElementSibling;

                        while (currentElement && currentElement !== endElement) {
                          if (currentElement.id && currentElement.id.includes('bb_msg_id_')) {
                            betweenElements.push(currentElement.outerHTML);
                          }
                            currentElement = currentElement.nextElementSibling;
                        }

                        return betweenElements;

                    }, startSelector, endSelector);
                };

                const startSelector = '#' + messageArray[messageArray.length - 1].messageId;
                const endSelector = '#ztoolbar';
                const elementsBetween = await getElementsBetweenSelectors(startSelector, endSelector);
                if (elementsBetween !== null) { // Check if elementsBetween is not null
                    let newMessages = elementsBetween.map((item: string) => {
                        const $ = cheerio.load(item);
                        const content = $('.text').text();
                        const time = $('.card-send-time__sendTime').text();
                        const messageId = $('.chat-message').attr('id');
                        let senderName = $(item).find('.card-sender-name span').text().trim();
                        // Nếu không tìm thấy tên người gửi, gán mặc định là "Minh"
                        if (!senderName && user?.name) {
                            senderName = user.name
                        } else {
                            senderName = "Client"
                        }

                        return { messageId, content, time , senderName };
                    });
                    messageArray = messageArray.concat(newMessages);
                } else {
                    console.log('No elements found between the selectors');
                }
            }
            callback({
              content : messageArray[messageArray.length - 1].content,
              time : messageArray[messageArray.length - 1].time,
              messageId : messageArray[messageArray.length - 1].messageId,
              author : {
                  name : messageArray[messageArray.length - 1].senderName,
                  async reply(message : string) {
                      await page.waitForSelector('#' + messageArray[messageArray.length - 1].messageId);
                      await page.click('#' + messageArray[messageArray.length - 1].messageId);
                      await page.waitForSelector('#messageViewContainer > div:nth-child(1) > div.chat-message__actions > div.chat-message__actions__btn.clickable.chat-message__actions__btn__reply');
                      await page.click('#messageViewContainer > div:nth-child(1) > div.chat-message__actions > div.chat-message__actions__btn.clickable.chat-message__actions__btn__reply');
                      await sendMessage(page , message)
                  },
              }
          })
        }
        interceptedRequest.continue();
    });
}
