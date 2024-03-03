import { Page } from "puppeteer";
import send from "./send";
import toConverstation from "./toConversation";
import { MessageOptions } from "../types";
export default class Actions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async send(message : MessageOptions):  Promise<void> { await send(this.page,message) }
    async toConverstation(groupName: string, groupId: string): Promise<void> { await toConverstation(this.page, groupName, groupId) }
}
