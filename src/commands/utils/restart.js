const Discord = require("discord.js")
const process  = require("process")
const config = require("../../../config")
module.exports = {
    name: "restart",
    descriprion: "Restart le bot",

    async run(client, message, args) {

        if (!message.member.roles.cache.has(config.roles.admin)) {
            return;
        }

        message.channel.send(`Update en cours... `).then(async message => {
            await message.edit(`Update Terminé`)
            client.destroy() 
            return process.exit()
          })
    }
}