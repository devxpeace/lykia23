module.exports = {
    name: "setalarmchannel",
    permission: "ADMINISTRATOR",
    description: 'Defines the alarm channel', 
    options: [],
    async Execute(GlobalParameters, Interaction){
       
        require('../functions/alarmhandler').SetNotificationsChannel(Interaction.channel.id);

        Interaction.reply({content: 'Channel saved successfully', ephemeral: true});
    }
}