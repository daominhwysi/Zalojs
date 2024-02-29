import { Page } from "puppeteer";
import init, { eventEmitter } from "./core/init";;
import Events from "./events";
import Actions from "./actions";
import Callback from "./types/MessageListener";
import { UserCallBack } from "./types/user";
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

  async on(event : string,callback : Callback )
  { this.events.on(event, callback) }
  async once(event : string,callback : UserCallBack )
  { this.events.once(event, callback) }
  
  async sendMessage(message : string){ await this.actions.sendMessage(message)}
  async toGroup(groupName : string,groupSelector : string){ await this.actions.toGroup(groupName ,groupSelector)}
}

