'use strict';

const config_handler = require('./config_handler')
const database = require('./db');

async function main() {
   console.log("Start");
   await config_handler.loadConfig('config.json');
   const texterkennung = require('./textanalysis');
   const bot = require('./slack-bot/slack-api-calls');
   await bot.connect("ai-issuebot");
   var timeout = undefined;
   bot.on('receive', async(data) => {
      // Weiterverarbeitung
      if(data.text){
         var reactiontype = texterkennung.reaction(data);
         var userid = data.user;
         if(reactiontype === 1){
            var issues = await database.issue.listBySlackUserID(userid);
            if(issues.length > 0){
               bot.send("Du könntest dieses Issue bearbeiten " + issues[0].url);
               bot.send("Alternativ hast du noch " + issues.length-1 + " offene Issues!");
            }else {
               bot.send("Du warst fleißig! Keine offenen Issues!");
           }x
         } else if (reactiontype === 2) {
            bot.send("<@" + data.user + "> Ich bin noch da.");
         } else if (reactiontype === 3) {
            var issues = await database.issue.listBySlackUserID(userid);
            if(issues.length > 0){
               bot.send("Zurück an die Arbeit! Du hast noch " + issues.length + " offene Issues, zum Beispiel dieses hier: " + issues[0].url);
            } else {
               bot.send("Gönn dir 'ne Pause, du hast gut gearbeitet! Keine offenen Issues!");
            }
         } else if (reactiontype === 4) {
          timeout = setInterval(() => {bot.send("hi!")}, 5000)
         } else if (reactiontype === 5) {
            if (timeout) {
               clearTimeout(timeout);
               timeout = undefined;
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
