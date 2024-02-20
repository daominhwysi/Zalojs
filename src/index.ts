import sendMessage from "./module/sendMessage";
import toGroup from "./module/toGroup";
import init from "./module/init";
import renderPDF from "./module/capture";
import getAllMessage from "./module/getAllMessage";
import messageListener from "./module/messageListener";

export { init };

export class Group {
    private page: any;

    constructor(page: any) {
        this.page = page;
    }
    async msgListener(callback : Function): Promise<void> {
        await messageListener(this.page, callback)
    }
    async isLogin(callback : Function): Promise<void> {
        let logined = false;
          
        this.page.on('framenavigated', async (frame : any) => {
            if (frame.url().startsWith("https://chat.zalo.me/") && !logined) {
                logined = true;
                callback()
                // Remove the event listener after the condition is met
                this.page.off("framenavigated");
            }
        });
    }
    async sendMsg(message: string): Promise<void> {
        if (message) {
            try {
                await sendMessage(this.page, message);
            } catch (error) {
                console.log(error)
            }
        }
    }
    async getAllMsg(): Promise<void> {
        await getAllMessage(this.page)
    }
    async capture(): Promise<void> {
        renderPDF(this.page)
    }
    
    async openGroup(groupName: string, groupId: string): Promise<void> {
        if (groupName && groupId) {
            try {
                await toGroup(this.page, groupName, groupId);
            } catch (error) {
                console.log(error)
            }          
        }
    }
}
