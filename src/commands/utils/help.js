const Discord = require("discord.js")

module.exports = {
    name: "help",
    description: "Affiche le menu d'aide",

    async run(client, message, args) {

        const embed = new Discord.EmbedBuilder()
            .setTitle("Menu Help")
            .setDescription("Voici mes commandes")
            .setColor("White")

        const select = new Discord.StringSelectMenuBuilder()
        .setCustomId(`help:${message.author.id}`)
            .setOptions(
                new Discord.StringSelectMenuOptionBuilder()
                .setLabel("help")
                .setValue("help"),

                new Discord.StringSelectMenuOptionBuilder()
                .setLabel("gen")
                .setValue("gen"),

                new Discord.StringSelectMenuOptionBuilder()
                .setLabel("add")
                .setValue("add"),

                new Discord.StringSelectMenuOptionBuilder()
                .setLabel("stock")
                .setValue("stock"),

                new Discord.StringSelectMenuOptionBuilder()
                .setLabel("create")
                .setValue("create"),

                new Discord.StringSelectMenuOptionBuilder()
                .setLabel("ping")
                .setValue("ping")
            )

            const row = new Discord.ActionRowBuilder().addComponents(select)

            message.channel.send({embeds: [embed], components: [row]})
    }
}