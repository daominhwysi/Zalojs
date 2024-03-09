import getAllMessage from './getAllMessage';
import { HTTPRequest, Page } from 'puppeteer';
import { User } from '../../types/user';
export default async function messageListener(page: Page, callback: Function, user: User | null): Promise<void> {
    let isRunning = false;
    page.on('request', async (request: HTTPRequest) => {
       
        if (request.url().startsWith("https://tt-group-wpa.chat.zalo.me/api/group/deliveredv2?zpw_ver=628&zpw_type=30") && !isRunning) {
            const startTime = process.hrtime.bigint();
            isRunning = true
            // store.dispatch(toggle());
            const messageArray = await getAllMessage(page, user);
            await page.evaluate((messageArray) => {
                var elementsByClass = document.querySelectorAll('.rel.zavatar-container.avatar--overlay');
                elementsByClass.forEach(function (element) {
                    element.remove();
                });
                const messageIdArray = messageArray.map(obj => obj.messageId);
                messageIdArray.forEach(function (id) {
                    if (id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.remove()
                        }
                    }
                });

            }, messageArray);
            if (messageArray.length != 0 && messageArray) {
                callback(messageArray);
            }
            isRunning = false;
//22 mil second
        }
    });
}
