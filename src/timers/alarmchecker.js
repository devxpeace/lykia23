module.exports = {
    TickSeconds: 60,
    async Tick(GlobalParameters){
        
        var Alarms = require('../functions/alarmhandler').GetAlarms();
        Alarms.forEach(async function(Alarm){
            console.log('Checking ' + Alarm.collection);
            await require('../functions/alarmhandler').CheckAlarm(GlobalParameters, Alarm);
        });
    }
}