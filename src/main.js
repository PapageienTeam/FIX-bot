'use strict';

const config_handler = require('./config_handler')
const bot = require('./slack-bot/slack-api-calls');
const texterkennung = require('./textanalysis');
const database = require('./db');

async function main() {
   console.log("Start");
   await config_handler.loadConfig('config.json');
   await bot.connect("ai-issuebot");
   var timeout;
   bot.on('receive', async(data) => {
      // Weiterverarbeitung
      if(data.text){
         var reactiontype = texterkennung.reaction(data);
         var userid = data.user;
         if(reactiontype === 1){
            var issues = await database.issue.listBySlackUserID(userid);
            if(issues.length > 0){
               bot.send("Issues: " + issues[0].url);
            }
            bot.send("Langeweile: Anzahl der offenen Issues " + issues.length);
         } else if (reactiontype === 2) {
            bot.send("<@here>; Ich bin noch da.");
         } else if (reactiontype === 3) {
            var issues = await database.issue.listBySlackUserID(userid);
            if(issues.length > 0){
               bot.send("Issues: " + issues[0].url);
            } else {
               bot.send("Keine offenen Issues");
            }
         } else if (reactiontype === 4) {
            setInterval(() => {bot.send("hi!")}, 1000)
         } else if (reactiontype === 5) {
            if (timeout) {
               clearTimeout(timeout);
            }
         }
      }
   });
}




if (require.main===module){
   process.on('unhandledRejection', err => {
      console.log(err);
      process.exit(1);
   });
   main();
} else {
   module.exports ={
      db: require('./db'),
      config_handler: require('./config_handler')
   };
}
