const axios = require('axios');
const fs = require('fs');

module.exports = {
    GetAlarms(discordId){
        let rawdata;
        rawdata = fs.readFileSync('alarms.json');
        let loadData = JSON.parse(rawdata);
        if (!discordId) return loadData;
        return loadData.filter(x => x.discordId == discordId);
    },
    SetAlarm(collection, price, discordId){
        var Alarms = this.GetAlarms();
        Alarms.push({ collection: collection, price: price, discordId: discordId});
        var data = JSON.stringify(Alarms, null, 4);
        fs.writeFileSync('alarms.json', data);
        return;
    },
    async CheckAlarm(GlobalParameters, Alarm){
        try {
            var result = await axios.get('https://api.opensea.io/api/v1/collection/'+Alarm.collection);
            var FloorPrice = result.data.collection.stats.floor_price;
            console.log('Collection FloorPrice:' + FloorPrice);
            console.log('Alarm price: '+ Alarm.price);
            if (Alarm.price > FloorPrice) return;

            var Channel = await this.GetNotificationsChannel(GlobalParameters);
            var Embed = require('../functions/generateembed')('Price alarm!', '⚠️ Collection **'+Alarm.collection+'**\'s floor price just went below __' + Alarm.price + " ETH__ \nCurrent price: __"+FloorPrice+" ETH__");
            Channel.send({content: "<@"+Alarm.discordId+">", embeds: [Embed]})
            this.RemoveAlarm(Alarm.collection,  Alarm.discordId);
        }
        catch (error){
            console.log(error);
            console.log('Removing alarm ' + Alarm.collection);
            var Channel = await this.GetNotificationsChannel(GlobalParameters);
            Channel.send("<@"+Alarm.discordId+">, your alarm for collection **" + Alarm.collection + "** is invalid. Please try again");
            this.RemoveAlarm(Alarm.collection, Alarm.discordId);
        }
    },
    RemoveAlarm(Collection, discordId){
        var Alarms = this.GetAlarms();
        var Alarm = Alarms.find(x => x.collection === Collection && x.discordId === discordId);
        if (!Alarm) return false;
        var Index = Alarms.indexOf(Alarm);
        Alarms.splice(Index, 1);
        var data = JSON.stringify(Alarms, null, 4);
        fs.writeFileSync('alarms.json', data);
        return true;
    },
    SetNotificationsChannel(channelId){
        var json = { channelId: channelId };
        var data = JSON.stringify(json, null, 4);
        fs.writeFileSync('settings.json', data);
        return;
    },
    async GetNotificationsChannel(GlobalParameters){
        let rawdata;
        rawdata = fs.readFileSync('settings.json');
        let loadData = JSON.parse(rawdata);
        var Channel = await GlobalParameters.client.channels.fetch(loadData.channelId);
        return Channel;
    }
}