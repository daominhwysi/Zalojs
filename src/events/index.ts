import { Page } from "puppeteer";
import messageListener from "./messageListener";
import {User,UserCallBack} from "../types/user";
import { eventEmitter } from "../core/init";
import scrapeData from "../core/scrapeData";
import Callback from "../types/MessageListener";

export default class Events {
    private page: Page;
    public user: User | null;

    constructor(page: Page, user: User | null) {
        this.page = page;
        this.user = user;
        this.connect()
    }
    private connect(): void {
        eventEmitter.once('initialized', async () => {this.user = await scrapeData(this.page);eventEmitter.emit('ready')});
    }
    async on(event: string, callback: Callback): Promise<void> {
        switch (event) {
            case "message":
                eventEmitter.on('ready', () => messageListener(this.page, callback , this.user))
                break;
            default:
                console.log("It's something else.");
        }
    }
    async once(event : string,callback : UserCallBack){
        switch (event) {
            case "ready":
                eventEmitter.once('ready', () => callback(this.user));
                break;
            default:
                console.log("It's something else.");
        }
    }
}
