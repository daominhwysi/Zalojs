import { Page } from "puppeteer";
import send from "./send";
import toConversation from "./toConversation";
import { MessageOptions } from "../types";
import { getAllMessage } from "../events/messageListener";
export default class Actions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async send(message : MessageOptions):  Promise<void> {if(message) {await send(this.page,message)} else { throw new Error("Type of message is", message)} }
    async toConversation(groupName: string, groupId: string): Promise<void> { if(groupId && groupName) {await toConversation(this.page, groupName, groupId)} else { throw new Error("Type of group Name or GroupID is undefined");} }
    getAllMessage(){ return getAllMessage() }
}
