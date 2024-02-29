import { Client, init } from '../dist/index.js';
import config from '../config.json'
(async () => {
    // turn headless to true when deploy
    const { browser , page } = await init(config.gname , config.gselector, false);
    const client = new Client(page);
    const prefix = '!';
    
    await client.once('ready',async (user: any) => {
      console.log(`Logged in as ${user.name}`)
    })
    await client.on('message' , async (message : any) => {
        console.log(message)
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        try {
          const commandHandler = require(`./commands/${command}`).default;
          await commandHandler(client, message, args);
        } catch (error) {
            console.error(error);
            message.author.reply('There was an error while executing this command.');
        }
    });
})();
