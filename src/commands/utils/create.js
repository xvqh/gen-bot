const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

module.exports = {
    name: "create",
    description: "Créer un nouveau fichier JSON pour un service",

    async run(client, message, args) {

        if (!message.member.roles.cache.has(config.roles.restock)) {
            return;
        }
        
        if (args.length < 1) {
            return message.reply("Utilisation incorrecte. Exemple : `create <service>`");
        }

        const service = args[0].toLowerCase();
        const serviceFilePath = path.resolve(__dirname, '../../Services', `${service}.json`);

        if (fs.existsSync(serviceFilePath)) {
            return message.reply(`Le service \`${service}\` existe déjà.`);
        }

        try {
            fs.writeFileSync(serviceFilePath, '[]', 'utf8');

            return message.reply(`Le service \`${service}\` a été créé avec succès.`);
        } catch (error) {
            console.log(error);
        }
    }
}