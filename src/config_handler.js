'use strict';

const fs = require('fs-extra');

async function loadConfig(FilePath) {
  let config = await fs.readJson(FilePath);
  loadConfigIntoEnvironment(config);
}

function getConfigByKey(Key) {
  return process.env[Key];
}

function loadConfigIntoEnvironment(config) {
  for (const key in config) {
    process.env[key] = config[key];
  }
}

module.exports = {
  loadConfig,
  loadConfigIntoEnvironment,
};
