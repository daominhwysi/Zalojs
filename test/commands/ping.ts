export default async function(client: any, message: any, args: any[]) {
    console.log('Received message:', message.content);
    message.author.reply('Pong 🏓!');
}
