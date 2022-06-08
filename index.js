async function MainAsync(){
    const fs = require('fs');
    const { Client, Intents, Collection } = require('discord.js');
    var glob = require("glob");
    
    require('dotenv').config();

    const myIntents = new Intents();
    myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS);

    var client = new Client({ intents: myIntents });
    
    var GlobalParameters = {
        client: client,
        timers: [],
        commands: []
    }

    //Initialize events
    var EventHandler = require('./src/handlers/eventHandler');
    EventHandler.initialize(GlobalParameters);

    //Initialize commands
    var CommandHandler = require('./src/handlers/commandHandler');
    CommandHandler.initialize(GlobalParameters);
    GlobalParameters.commands = CommandHandler.getCommands();

    //Initialize buttons
    var ButtonHandler = require('./src/handlers/interactionHandler');
    ButtonHandler.initialize(GlobalParameters);

    //Initialize timers
    glob("src/timers/*.js", async function (er, files) {
        files.forEach(function (fileName) {
            var timer = require("./" + fileName);
            GlobalParameters.timers.push(timer);
            setInterval(function(){
                timer.Tick(GlobalParameters);
            }, timer.TickSeconds * 1000);
        });
    });
    


    client.login(process.env.BOT_TOKEN);
}
MainAsync();
