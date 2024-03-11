module.exports = async (message, client, args) => {
    await client.send({message : `${message.author.name} Pong!});
};
