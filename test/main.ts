// Importing necessary modules from your custom module
import { Group, init } from '../dist/index.js';

(async () => {
    const { browser, page } = await init('Lonely', '#group-item-g5701541405487732670',false);

    const group = new Group(page);

    await group.capture();
    await group.msgListener((item: any ) => {
      console.log("A message has been sent", item);
    });
    await group.isLogin( async () => {
      console.log("logined")
      await group.sendMsg("Client has been started as MinhBacKy")
      await group.sendMsg("Test MessageListener event")
    })
})();
