import { Page } from "puppeteer";
import sendMessage from "./sendMessage";
import User from "../types/user";
import toGroup from "./toGroup";
export default class Actions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async sendMessage(message : string):  Promise<void> { await sendMessage(this.page,message) }
    
    async toGroup(groupName: string, groupId: string): Promise<void> { await toGroup(this.page, groupName, groupId) }
}
