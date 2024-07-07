const Discord = require("discord.js")
const client = new Discord.Client({ intents: [Object.keys(Discord.GatewayIntentBits)] })
const Commands = require("./src/loaders/Commands")
const config = require("./config")

client.commands = new Discord.Collection();
client.cooldowns = new Map();

Commands(client);

client.on("messageCreate", message => {
    if (!message.content.startsWith(config.client.prefix)) return;

    const args = message.content.slice(config.client.prefix.length).trim().split(/ +/);
    const name = args.shift().toLowerCase();
    const command = client.commands.get(name);

    if (command) {
        command.run(client, message, args);
    }
})

// 〃 help interaction
client.on("interactionCreate", async interaction => {
    if (!interaction.isStringSelectMenu()) return;

    const [customId, userId] = interaction.customId.split(':');
    if (customId === 'help' && userId === interaction.user.id) {
        const command = client.commands.get(interaction.values[0]);
        if (command) {
            const embed = new Discord.EmbedBuilder()
                .setDescription(`**Name:** \`${command.name}\`\n**Description:** \`${command.description}\``)
                .setColor("White");

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    } else {
        await interaction.reply({ content: "pas la perm bb", ephemeral: true });
    }
});

// 〃 Bot ping
client.on('messageCreate', message => {
  
  if (message.author.bot) return;
  
  const isOnlyBotMention = message.content.replace(/<@!?(\d+)>/g, '').trim() === '' && message.mentions.users.has(client.user.id);
  
  const isReplyToBot = message.reference && message.reference.messageId ? (message.channel.messages.cache.get(message.reference.messageId)?.author.id === client.user.id) : false;

  if (isOnlyBotMention && !isReplyToBot) {
      message.reply(`Mon préfix est \`${config.client.prefix}\``)
  }
});

client.on("ready", () => {
    client.user.setActivity({name: "🏯", type: 5})
})

client.login(config.client.token)
