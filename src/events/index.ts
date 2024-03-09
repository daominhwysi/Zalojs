import { Page } from "puppeteer";
import messageListener from "./messageListener";
import { eventEmitter } from "../core/init";
import { store } from '../state'
import { User } from "../types";
export default class Events {
    private page: Page;
    user : User;
    constructor(page: Page) {
        this.page = page;
        this.user = null;
        this.connect()
    }
    private connect(): void {
        eventEmitter.once('scraped', async () => {
            this.user = store.getState().user;
            eventEmitter.emit('ready')
        });
    }


    async on(event: string, callback: Function): Promise<void> {
        switch (event) {
            case "message":
                eventEmitter.on('ready', () => messageListener(this.page, callback, this.user));
                break;
            default:
                console.log("It's something else.");
        }
    }

    async once(event: string, callback: () => void): Promise<void> {
        switch (event) {
            case "ready":
                eventEmitter.once('ready', () => callback());
                break;
            default:
                console.log("It's something else.");
        }
    }
}
