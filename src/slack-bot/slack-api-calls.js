'use strict';

var bluebird = require('bluebird')
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var bot_token = process.env.SLACK_BOT_TOKEN;
var rtm = new RtmClient(bot_token);
var events = require('events');

var channel = 0;

var connect = function (connecting_channel){
   // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
   rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
      for (const c of rtmStartData.channels) {
         if (c.is_member && c.name === connecting_channel) {
            channel = c.id
         }
      }
      console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
   });
   // you need to wait for the client to fully connect before you can send messages
   console.log("This: ", this);
   var promise = new Promise((resolve) => {
      rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
         console.log("Connected");
         send("'Allo! I bims eins GitBot!");
         startListen(this);
         resolve();
      });
   });
   rtm.start();
   return promise;
};

var send = function(message){
   console.log("Sent",message);
   rtm.sendMessage(message, channel);
};

var startListen = function(context){
   rtm.on(RTM_EVENTS.MESSAGE, (message) => {
      context.emit('receive', message);
   });
};

var commands = {connect: connect, send: send};
Object.setPrototypeOf(commands, new events.EventEmitter);
module.exports = commands;
