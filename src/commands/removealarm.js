module.exports = {
    name: "removealarm",
    permission: false,
    description: 'Removes all alarms for a collection', 
    options: [
        { type: "string", name: "collection", description: "The collection to add the alarm to", required: true}
    ],
    async Execute(GlobalParameters, Interaction, CommandArguments){
       
        var Collection = CommandArguments[0].value;


        var AlarmRemoved = require('../functions/alarmhandler').RemoveAlarm(Collection, Interaction.member.id);

        if (!AlarmRemoved) return Interaction.reply({content: "You do not have an alarm on this collection", ephemeral: true});
        Interaction.reply({content: "Alarm Removed", ephemeral: true});
    },
    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
}