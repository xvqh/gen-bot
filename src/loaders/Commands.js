const fs = require("fs")

module.exports = client => {
    let count =  0;
    const commandfolder = fs.readdirSync("./src/commands/")

    for(const folder of commandfolder) {
        const commandFile = fs.readdirSync(`./src/commands/${folder}/`)
        for(const file of commandFile) {
            const command = require(`../commands/${folder}/${file}`)
            client.commands.set(command.name, command);
            count++
        }
    }

    console.log(`〃 Commands: ${count}`)
}