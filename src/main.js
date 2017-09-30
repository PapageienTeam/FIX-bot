'use strict';

const config_handler = require('./config_handler')

async function main() {
  console.log("Start");
  await config_handler.loadConfig('config.json');
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
