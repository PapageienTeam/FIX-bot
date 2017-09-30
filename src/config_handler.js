'use strict';

const fs = require('fs-extra');

async function loadConfig(FilePath) {
  let config = await fs.readJson(FilePath);
  for(let key in config) {
    process.env[key] = config[key];
  }
}

function getConfigByKey(Key) {
  return process.env[Key];
}

module.exports = {loadConfig};
