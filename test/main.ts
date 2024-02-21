import { Client, init } from '../dist/index.js';

(async () => {
    // turn headless to true when deploy
    const { browser, page } = await init('Lonely', '#group-item-g5701541405487732670', true);
    const client = new Client(page);
    const prefix = '!';
    await client.on('ready',async (user: any) => {
      await client.sendMsg("Message event have been started!")
      client.mPolls('Nhà dái F69',['tai','xiu'])
      console.log(`Logged in as ${user.name}`)
    })
    await client.on('message' , (message : any) => {
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if(command == 'ping'){
          client.sendMsg('Pong')
        }
    });
})();
