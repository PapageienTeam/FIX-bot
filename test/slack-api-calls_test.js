test('Slackverbindung testen', () => {
   const sut = require('../src/slack-bot/slack-api-calls');
   expect.assertions(0);
   return sut.connect("ai-issuebot").then( function (data){
      console.log("Connected");
   });
});

test('Nachricht senden', async() => {
   const sut = require('../src/slack-bot/slack-api-calls');
   expect.assertions(0);
   return sut.connect("ai-issuebot").then( function (data){
      console.log("Connected, sending");
      sut.send("Hallo wie gehts?");
   });
});

test('Nachricht empfangen', async() => {
   const sut = require('../src/slack-bot/slack-api-calls');
   expect.assertions(1);
   await sut.connect("ai-issuebot");
   await new Promise((resolve) => {
      sut.on('receive', (data) => {
         console.log("-------Receive---------", data);
         expect(data).toBeTruthy();
         resolve();
      });
   });
});

/*
test('Nachricht empfangen', async() => {
   const sut = require('../src/slack-bot/slack-api-calls');
   expect.assertions(0);
   return sut.connect("ai-issuebot").then(function(data){
      expect.assertions(0);
      var promise = sut.receive().then(function (data){
         console.log("Promisewert: ", data);
      });
      return promise;
   });
});*/
