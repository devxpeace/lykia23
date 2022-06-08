var events = [];

module.exports = {
    getEvents: function (){
        return events;
    },
    initialize: function (GlobalParameters){
        
        require("fs").readdirSync('./src/events').forEach(function(file) {
            var event = require("../events/" + file);
            if (event.once){
                GlobalParameters.client.once(event.name, (...args) => event.execute(GlobalParameters, ...args));
            }
            else {
                GlobalParameters.client.on(event.name, (...args) => event.execute(GlobalParameters, ...args));
            }
            events.push(event);
            console.log('Initialized event: ' + event.name);
        });
    }
}