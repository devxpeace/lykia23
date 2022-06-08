module.exports = {
    name: "forcecheck",
    permission: "ADMINISTRATOR",
    description: 'Forces all alarms to be checked', 
    options: [],
    async Execute(GlobalParameters, Interaction){
       
        require('../timers/alarmchecker').Tick(GlobalParameters);

        Interaction.reply({content: 'Checking alarms...', ephemeral: true});
    }
}