module.exports = {
    name: "addalarm",
    permission: false,
    description: 'Adds an alarm', 
    options: [
        { type: "string", name: "collection", description: "The collection to add the alarm to", required: true},
        { type: "string", name: "price", description: "The price (in ETH) for the alarm", required: true},
    ],
    async Execute(GlobalParameters, Interaction, CommandArguments){
       
        var Collection = CommandArguments[0].value;
        var Price = CommandArguments[1].value;

        if (!this.isNumeric(Price)) return Interaction.reply({content: "Please enter a valid price in ETH", ephemeral: true});

        require('../functions/alarmhandler').SetAlarm(Collection, Number(Price), Interaction.member.id);

        Interaction.reply({content: "Alarm added", ephemeral: true});
    },
    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
}