import { eventEmitter } from './module/init';
import scrapeData from "./module/scrapeInfo";
import init from './module/init';
import messageListener from './module/messageListener';
import getAllMessage from './module/getAllMessage';
import sendMessage from './module/sendMessage';
import renderPDF from './module/capture';
import toGroup from './module/toGroup';
import createPoll from './module/createPoll';
export { init };

export class Client {
    private page: any;
    public user: { tag: string } | null;
    constructor(page: any) {
        this.page = page;
        this.user = null
        this.connect();
    }
    private async connect(): Promise<void> {
        eventEmitter.once('initialized', async() => {
            this.user = await scrapeData(this.page);
            eventEmitter.emit('ready'); // Gửi sự kiện 'ready' khi đã lấy được dữ liệu
        });
    }
    
    async on(event : string, callback : Function): Promise<void>{
        switch (event) {
            case 'message':
                await messageListener(this.page, callback);
                break;
            case 'ready':
                eventEmitter.once('ready', () => callback(this.user)); // Truyền dữ liệu user vào callback
                break;
            // Thêm các trường hợp xử lý sự kiện khác nếu cần
        }
    }
    async once(event : string, callback : Function): Promise<void>{
        switch (event) {
            case 'login':
                let logined = false;
                this.page.on('framenavigated', async (frame : any) => {
                    if (frame.url().startsWith("https://chat.zalo.me/") && !logined) {
                        logined = true;
                        callback();
                        this.page.off("framenavigated");
                    }
                });
                break;
            case 'ready':
                eventEmitter.on('ready', () => callback());
                break;
            // Thêm các trường hợp xử lý sự kiện khác nếu cần
        }
    }

    async sendMsg(message: string): Promise<void> {
        if (message) {
            try {
                await sendMessage(this.page, message);
            } catch (error) {
                console.log(error);
            }
        }
    }
    async mPolls(title: string, choices: string[]): Promise<void> {
        createPoll(this.page,title, choices)
    }
    async getAllMsg(): Promise<void> {
        await getAllMessage(this.page);
    }

    async capture(): Promise<void> {
        renderPDF(this.page);
    }
    
    async openGroup(groupName: string, groupId: string): Promise<void> {
        if (groupName && groupId) {
            try {
                await toGroup(this.page, groupName, groupId);
            } catch (error) {
                console.log(error);
            }          
        }
    }
}
