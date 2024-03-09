import { Page } from "puppeteer";
import send from "./send";
import toConversation from "./toConversation";
import { MessageOptions } from "../types";
export default class Actions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async send(message : MessageOptions):  Promise<void> { await send(this.page,message) }
    async toConversation(groupName: string, groupId: string): Promise<void> { await toConversation(this.page, groupName, groupId) }
}
