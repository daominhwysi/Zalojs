import { Page } from "puppeteer";
import init from "./core/init";;
export * from './types'
import Events from "./events";
import Actions from "./actions";
import { MessageCallback } from "./types/MessageListener";
import { User } from "./types";
export { init }
export default class Client {
    private page: Page;
    private events: Events;
    private actions: Actions;

    constructor(page: Page) {
        this.page = page;
        this.events = new Events(page, null);
        this.actions = new Actions(page);
    }

    async on(event: string, callback: (user: MessageCallback) => void): Promise<void> {
        await this.events.on(event, callback);
    }

    async once(event: string, callback: (user: User ) => void): Promise<void> {
        await this.events.once(event, callback);
    }

    async sendMessage(message: string): Promise<void> {
        await this.actions.sendMessage(message);
    }

    async toGroup(groupName: string, groupSelector: string): Promise<void> {
        await this.actions.toGroup(groupName, groupSelector);
    }
}
