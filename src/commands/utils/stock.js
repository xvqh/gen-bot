const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

module.exports = {
    name: "stock",
    description: "Afficher le stock de comptes par service",

    async run(client, message, args) {
        
        if (!message.member.roles.cache.has(config.roles.client)) {
            return;
        }

        const servicesPath = path.resolve(__dirname, '../../Services');
        
        const serviceFiles = fs.readdirSync(servicesPath).filter(file => file.endsWith('.json'));
        
        const embed = new Discord.EmbedBuilder()
            .setTitle("Stock de comptes par service")
            .setColor("White");

        for (const file of serviceFiles) {
            const filePath = path.join(servicesPath, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const serviceName = path.basename(file, '.json');
            embed.addFields({ name: serviceName, value: `\`${data.length}\` comptes`, inline: true });
        }

        message.channel.send({ embeds: [embed] });
    }
}