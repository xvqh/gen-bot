const fs = require("fs")
const path = require("path")
const Discord = require("discord.js")
const config = require("../../../config")
module.exports = {
    name: "add",
    description: "Ajouter un compte à un service",

    async run(client, message, args) {

        if (!message.member.roles.cache.has(config.roles.restock)) {
            return;
        }

        if (args.length < 2) {
            return message.reply("Utilisation incorrecte. Exemple : `add <service> <élément1> <élément2> ...`");
        }

        const service = args[0].toLowerCase();
        const serviceFilePath = path.resolve(__dirname, `../../Services/${service}.json`);

        if (!fs.existsSync(serviceFilePath)) {
            return message.reply(`Le service \`${service}\` n'existe pas.`);
        }

        const elements = args.slice(1);

        try {
            let data = [];
            if (fs.existsSync(serviceFilePath)) {
                const fileData = fs.readFileSync(serviceFilePath, 'utf8');
                data = JSON.parse(fileData);
            }

            elements.forEach(element => {
                data.push(element);
            });

            fs.writeFileSync(serviceFilePath, JSON.stringify(data, null, 4));

            const webhook = new Discord.WebhookClient({ url: config.webhook.webhook });

            const embed = new Discord.EmbedBuilder()
                .setTitle(`Codes ajoutés pour le service ${service}`)
                .setDescription(`${message.author} a ajoutés au service \`${service}\`. Nombre de codes : \`${elements.length}\``)
                .setColor("Green");

            await webhook.send({
                content: `<@&${config.roles.client}>`,
                embeds: [embed],
                username: 'Notif Restock'
            });

            webhook.destroy();

            return message.channel.send(`Les éléments ont été ajoutés au service \`${service}\`.`);
        } catch (error) {
            console.log(error);
        }
    }
}