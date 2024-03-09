import getMessage from './getMessage';
import { HTTPRequest, Page } from 'puppeteer';
import { User } from '../../types/user';
const messageArray: { content: string | undefined; name: string | undefined; messageId: string | undefined; time: string; }[] = []
export function getAllMessage(){
    return messageArray
}
export async function messageListener(page: Page, callback: Function, user: User | null): Promise<void> {
    let isRunning = false;
    page.on('request', async (request: HTTPRequest) => {
       
        if (request.url().startsWith("https://tt-group-wpa.chat.zalo.me/api/group/deliveredv2?zpw_ver=628&zpw_type=30") && !isRunning) {
            const startTime = process.hrtime.bigint();
            isRunning = true
            // store.dispatch(toggle());
            const message = await getMessage(page, user);
            await page.evaluate((message) => {
                var elementsByClass = document.querySelectorAll('.rel.zavatar-container.avatar--overlay');
                elementsByClass.forEach(function (element) {
                    element.remove();
                });
                const messageIdArray = message.map(obj => obj.messageId);
                messageIdArray.forEach(function (id) {
                    if (id) {
                        var element = document.getElementById(id);
                        if (element) {
                            var newId = id.replace("bb_msg_id_", "read");
                            element.id = newId;
                            var elementsById = document.querySelectorAll('[id*=read]');
                            elementsById.forEach(function (element) {
                                element.remove();
                            });
                        }
                    }
                });

            }, message);
            if (message.length != 0 && message) {
                message.forEach(element => {
                    messageArray.push({
                        content : element.content,
                        name : element.name,
                        messageId : element.messageId,
                        time : element.time
                    })
                });
                callback(message);
            }
            isRunning = false
//22 mil second

        }

    });
}
