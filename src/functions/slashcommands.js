module.exports = async function (client, Commands){
        
    var ClientId = client.user.id;

    const { SlashCommandBuilder } = require('@discordjs/builders');
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    
    console.log(Commands)

    var DiscordApiCommands = [];
    Commands.forEach(function(Command){

        var DiscordApiCommand = new SlashCommandBuilder()
        .setName(Command.name)
        .setDescription(Command.description);
        
        Command.options.forEach(function(option){
            switch (option.type){
                case "user":
                    DiscordApiCommand.addUserOption(Option =>
                        Option.setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required));
                    break;
                case "channel":
                    DiscordApiCommand.addChannelOption(Option =>
                        Option.setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required));
                    break;
                case "integer":
                    DiscordApiCommand.addIntegerOption(Option =>
                        Option.setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required));
                    break;
                case "string":
                    DiscordApiCommand.addStringOption(Option =>
                        Option.setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required));
                    break;
                case "other":
                    
                    break;
            }
        });
        DiscordApiCommands.push(DiscordApiCommand);
    });
    
    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
    var a = await rest.put(
        Routes.applicationCommands(ClientId),
        { body: DiscordApiCommands },
    );
}