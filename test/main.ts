import Client, { init } from "../dist/index.js";
import config from '../config.json'
(async () => {
    const { browser , page } = await init({
      groupName : config.gname,
      groupSelector : config.gselector,
      headless : false
    })
    const client = new Client(page)
    client.on('message', (message : any) => {
      console.log(message)
    })
    client.once('ready',(user : any) => {
      console.log(user)
    })
})();
