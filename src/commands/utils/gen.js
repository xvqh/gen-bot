const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const config = require("../../../config")

module.exports = {
    name: "gen",
    description: "Générer un élément et le supprimer du stock",

    async run(client, message, args) {

        if (!message.member.roles.cache.has(config.roles.client)) {
            return message.reply("Tu n'est pas client.")
        }

        if (message.channel.id !== config.channels.channelgen) {
            return message.reply(`Mauvais channel, channel pour gen: <#${config.channels.channelgen}>.`)
        }

        if (args.length < 1) {
            return message.reply("Utilisation incorrecte. Exemple : `gen <service>`");
        }

        const service = args[0].toLowerCase();
        const serviceFilePath = path.resolve(__dirname, '../../Services', `${service}.json`);

        if (!fs.existsSync(serviceFilePath)) {
            return message.reply(`Le service \`${service}\` n'existe pas.`);
        }

        try {
            const data = JSON.parse(fs.readFileSync(serviceFilePath, 'utf8'));

            if (data.length === 0) {
                return message.reply({ embeds: [new Discord.EmbedBuilder().setDescription(`Plus de stock disponible pour le service \`${service}\`.`).setColor("Red")] });
            }

            const cooldown = client.cooldowns.get(message.author.id) || 0;
            const now = Date.now();
            const timeLeft = cooldown - now;

            if (timeLeft > 0) {
                const minutesLeft = Math.ceil(timeLeft / 60000);
                const timeLeftFormatted = `<t:${Math.floor(now / 1000 + timeLeft / 1000)}:R>`;

                return message.reply(`Veuillez attendre encore ${minutesLeft} minutes (${timeLeftFormatted}) avant de pouvoir refaire la commande.`);
            }

            const newCooldown = now + (config.client.time * 1000);
            client.cooldowns.set(message.author.id, newCooldown);

            const index = Math.floor(Math.random() * data.length);
            const generatedAccount = data[index];

            data.splice(index, 1);
            fs.writeFileSync(serviceFilePath, JSON.stringify(data, null, 4));

            const embed = new Discord.EmbedBuilder()
                .setTitle(`Compte généré pour le service ${service}`)
                .setColor("White")
                .setDescription(`|| ${generatedAccount} ||`);

            await message.delete();

            await message.author.send({ embeds: [embed] });
            await message.author.send(`|| ${generatedAccount} ||`);

            return message.channel.send(`Le compte généré pour le service \`${service}\` a été envoyé en message privé.`);
        } catch (error) {
            console.log(error);
        }
    }
}