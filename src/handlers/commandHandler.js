var commands = [];

module.exports = {
    getCommands: function () {
        return commands;
    },
    initialize: function (GlobalParameters) {

        //Read commands from /src/commands
        require("fs").readdirSync('./src/commands').forEach(function (file) {
            var command = require("../commands/" + file);
            commands.push(command);
            console.log('Initialized command: ' + command.name)
        });

        //Register slash commands on ready
        GlobalParameters.client.on('ready', client => {
            require('../functions/slashcommands')(client, commands);
        });

        //Handle commands
        GlobalParameters.client.on('interactionCreate', (Interaction) => {
            if (Interaction.isCommand()) {
                console.log('Command executed: ' + Interaction.commandName)
                var Command = commands.find(x => x.name == Interaction.commandName);
                var CommandArguments = [];
                Command.options.forEach(function (option) {
                    var OptionObj = Interaction.options.get(option.name);
                    CommandArguments.push(OptionObj);
                });
                if (!Command) return;
                //if (Interaction.member.permissions.has(Command.permission) || Command.permission === false){
                    Command.Execute(GlobalParameters, Interaction, CommandArguments);
                //}
            }
        });
    }
}