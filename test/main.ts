import Client, { User , MessageCallback , init } from "../dist/index.js";
import config from '../config.json'

(async () => {
    const { browser , page } = await init({
      groupName : config.gname,
      groupSelector : config.gselector,
      headless : false
    })
    const client = new Client(page)
// Assuming 'client' is your chat client instance

    client.on('message', (message: MessageCallback) => {
          // Accessing properties of the message object
          console.log('Content:', message.content);
          console.log('Time:', message.time);
          console.log('Message ID:', message.messageId);
          console.log('Author Name:', message.author.name);
          message.author.reply('Your reply here')
    });

    client.once('ready',(user : User) => {
      console.log(user)
    })
})();
