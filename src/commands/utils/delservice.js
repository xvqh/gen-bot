const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

module.exports = {
    name: "delservice",
    description: "Supprimer un service existant",

    async run(client, message, args) {

        if (!message.member.roles.cache.has(config.roles.admin)) {
            return;
        }

        if (args.length < 1) {
            return message.reply("Utilisation incorrecte. Exemple : `delservice <service>`");
        }

        const service = args[0].toLowerCase();
        const serviceFilePath = path.resolve(__dirname, '../../Services', `${service}.json`);

        if (!fs.existsSync(serviceFilePath)) {
            return message.reply(`Le service \`${service}\` n'existe pas.`);
        }

        try {
            fs.unlinkSync(serviceFilePath);

            return message.reply(`Le service \`${service}\` a été supprimé avec succès.`);
        } catch (error) {
            console.log(error);
        }
    }
}