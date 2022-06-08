module.exports = {
    name: "help",
    permission: false,
    description: 'Shows the help menu', 
    options: [],
    async Execute(GlobalParameters, Interaction){
        var commands = GlobalParameters.commands;

        var embed = require('../functions/generateembed')('PokéHelp', "Here's a list of available commands:");
        embed.fields = [];

        commands.forEach(function(element){
            if (element.permission){
                if (Interaction.member.permissions.has(element.permission)){
                    embed.fields.push({name:element.name, value:element.description, inline:true});
                }
            }
            else embed.fields.push({name:element.name, value:element.description, inline:true});
        });

        Interaction.reply({embeds: [embed], ephemeral: true});
    }
}