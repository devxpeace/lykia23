var buttons = [];

module.exports = {
    initialize: function (GlobalParameters) {

        require("fs").readdirSync('./src/interactions').forEach(function (file) {
            var button = require("../interactions/" + file);
            buttons.push(button);
            console.log('Initialized interaction: ' + button.name)
        });

        GlobalParameters.client.on('interactionCreate', (Interaction) => {
            if (Interaction.isButton()) {
                console.log('Button clicked: ' + Interaction.customId);
                var Button = buttons.find(x => Interaction.customId.startsWith(x.name));
                if (Button) Button.Execute(GlobalParameters, Interaction);
            }
            if (Interaction.isSelectMenu()) {
                var Handler = buttons.find(x => Interaction.customId.startsWith(x.name));
                if (Handler) Handler.Execute(GlobalParameters, Interaction);
            }
        });
    }
}