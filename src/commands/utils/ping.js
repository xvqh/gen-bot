module.exports = {
    name: "ping",
    description: "Affiche le ping du bot", 

    async run(client, message, args) {

        message.reply(`ping: \`${client.ws.ping}\``)
    }
}