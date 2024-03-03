import { Page } from "puppeteer";
import messageListener from "./messageListener";
import { User } from "../types/user";
import { events } from "../core/init";
import scrapeData from "../core/scrapeData";
import { MessageCallback } from "../types";

export default class Events {
    private page: Page;
    public user: User;

    constructor(page: Page, user: User) {
        this.page = page;
        this.user = user;
        this.connect();
    }

    private async connect(): Promise<void> {
        // Wait for initialization, then scrape data and emit 'ready'
        events.once('initialized', async () => {
            this.user = await scrapeData(this.page);
            events.emit('ready');
        });
    }

    async on(event: string, callback: (user: MessageCallback) => void): Promise<void> {
        switch (event) {
            case "message":
                // When 'ready' event occurs, invoke messageListener with page, callback, and user
                events.once('ready', () => messageListener(this.page, callback, this.user));
                break;
            default:
                console.log("It's something else.");
        }
    }

    async once(event: string, callback: () => void): Promise<void> {
        switch (event) {
            case "ready":
                // When 'ready' event occurs, invoke the callback with the current user
                events.once('ready', () => callback());
                break;
            default:
                console.log("It's something else.");
        }
    }
}
