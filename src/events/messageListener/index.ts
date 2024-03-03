import getAllMessage from './getAllMessage';
import sendMessage from '../../actions/send';
import { HTTPRequest, Page } from 'puppeteer';
import {User} from '../../types/user';
export default async function messageListener(page: Page, callback: Function, user : User | null): Promise<void> {
    let messageArray : any[] = [];

    page.on('request', async (request : HTTPRequest) => {
        if (request.url().startsWith("https://tt-group-wpa.chat.zalo.me/api/group/deliveredv2")) {
            messageArray = await getAllMessage(page,user)
            
            await page.evaluate(() => {
                var elementsByClass = document.querySelectorAll('.rel.zavatar-container.avatar--overlay');
                elementsByClass.forEach(function(element) {
                    element.remove();
                });
                var elementsById = document.querySelectorAll('[id*=bb_msg_id_]');
                elementsById.forEach(function(element) {
                    element.remove();
                });
            });
            if(messageArray[messageArray.length - 1]){
                callback ({
                    content : messageArray[messageArray.length - 1].content,
                    time : messageArray[messageArray.length - 1].time,
                    messageId : messageArray[messageArray.length - 1].messageId,
                    author : {
                        name : messageArray[messageArray.length - 1].senderName,
                    }
                })
            }

        }
    });
}
