import { Page } from "puppeteer";
import init from "./core/init";;
export * from './types'
import Events from "./events";
import Actions from "./actions";
import { MessageCallback } from "./types/MessageListener";
import { MessageOptions, User } from "./types";
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

    async once(event: string, callback: () => void): Promise<void> {
        await this.events.once(event, callback);
    }

    async send(message: MessageOptions): Promise<void> {
        await this.actions.send(message);
    }
    async toConverstation(groupName: string, groupSelector: string): Promise<void> {
        await this.actions.toConverstation(groupName, groupSelector);
    }
}
