import { Page } from "puppeteer";
import init, { eventEmitter } from "./core/init";
import Events from "./events";
import Actions from "./actions";
import { MessageOptions, User } from "./types";
import scrapeData from "./core/scrapeData";
import { setName, setBio, setBirth, setNumber ,store } from './state';
export * from './types';

export { init };

export default class Client {
    private page: Page;
    private events: Events;
    private actions: Actions;
    private user: User | null;

    constructor(page: Page) {
        this.page = page;
        this.user = null;
        this.events = new Events(page);
        this.actions = new Actions(page);
        this.setupEventListeners();
    }

    // Sets up event listeners, including 'initialized' event.
    private setupEventListeners(): void {
        eventEmitter.once('initialized', async () => {
                this.user = await scrapeData(this.page);
                if(this.user){
                    store.dispatch(setName(this.user.name));
                    store.dispatch(setBio(this.user.bio));
                    store.dispatch(setBirth(this.user.birth));
                    store.dispatch(setNumber(this.user.number));
                    eventEmitter.emit('scraped');
                } else {
                    throw new Error("Can't get user info");       
                }
        });
    }

    // Registers a callback for the given event.
    async on(event: string, callback: () => void): Promise<void> {
        await this.events.on(event, callback);
    }

    // Registers a one-time callback for the given event.
    async once(event: string, callback: () => void): Promise<void> {
        await this.events.once(event, callback);
    }

    // Sends a message.
    async send(message: MessageOptions): Promise<void> {
        try {
            await this.actions.send(message);
        } catch (error) {
            console.error("Error while sending message:", error);
        }
    }

    // Switches to a conversation/group chat.
    async toConversation(groupName: string, groupSelector: string): Promise<void> {
        try {
            await this.actions.toConversation(groupName, groupSelector);
        } catch (error) {
            console.error("Error while switching conversation:", error);
        }
    }
    getAllMessage(){
        return this.actions.getAllMessage()    
    }
}
