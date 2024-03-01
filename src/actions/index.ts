import { Page } from "puppeteer";
import sendMessage from "./sendMessage";
import toGroup from "./toGroup";
import sendImage from "./sendImage";
export default class Actions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async sendMessage(message : string):  Promise<void> { await sendMessage(this.page,message) }
    async sendImage(path : string): Promise<void> { await sendImage(this.page, path)}
    async toGroup(groupName: string, groupId: string): Promise<void> { await toGroup(this.page, groupName, groupId) }
}
