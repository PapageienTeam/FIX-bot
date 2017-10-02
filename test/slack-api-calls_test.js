'use strict';

// Tests in this module are skipped, because they are integration tests.
// Please make sure that an api token is available in the configuration
// if you intend to run these tests.

beforeAll(() => {
    const config = require('../src/config_handler');
    return config.loadConfig('./config.json');
})

test.skip('Slackverbindung testen', () => {
   const sut = require('../src/slack-bot/slack-api-calls');
   expect.assertions(0);
   return sut.connect("ai-issuebot").then( function (data){
      console.log("Connected");
   });
});

test.skip('Nachricht senden', async() => {
   const sut = require('../src/slack-bot/slack-api-calls');
   expect.assertions(0);
   return sut.connect("ai-issuebot").then( function (data){
      console.log("Connected, sending");
      sut.send("Hallo wie gehts?");
   });
});

test.skip('Nachricht empfangen', async() => {
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

// This test requires another user to send a message into the given channel
// during test execution.
test.skip('Nachricht empfangen', async() => {
   const sut = require('../src/slack-bot/slack-api-calls');
   expect.assertions(0);
   return sut.connect("ai-issuebot").then(function(data){
      expect.assertions(0);
      var promise = sut.receive().then(function (data){
         console.log("Promisewert: ", data);
      });
      return promise;
   });
});
