module.exports = {
    name: "listalarms",
    permission: false,
    description: 'Gets the alarms', 
    options: [],
    async Execute(GlobalParameters, Interaction){
       
        var Alarms = require('../functions/alarmhandler').GetAlarms(Interaction.member.id);

        var content = "";
        Alarms.forEach(function(Alarm){
            content += "**"+Alarm.collection+"** ➡️ __"+Alarm.price+" ETH__\n";
        });
        var embed = require('../functions/generateembed')('Alarms', content);


        Interaction.reply({embeds: [embed], ephemeral: true});
    }
}