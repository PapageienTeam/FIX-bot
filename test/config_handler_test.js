const config_handler = require("../src/config_handler")
const fs = require('fs-extra');

// This test depends on the filesystem, so it is skipped by default.
test.skip("loadConfig", async () => {
  let TestConfig = JSON.stringify({
    PGUSER: 'postgres',
    PGHOST: 'localhost',
    PGPORT: 5050,
    PGPASSWORD: 'test123',
    PGDATABASE: 'gitbot',
    GIT_ORGANISATION: 'Team',
    SLACK_BOT_TOKEN: 'token'
  });
  await fs.writeFile('config_test.json', TestConfig);
  let _ = await config_handler.loadConfig('config_test.json');
  expect(process.env['PGUSER']).toBe('postgres');
  expect(process.env['PGHOST']).toBe('localhost');
  expect(process.env['PGPORT']).toBe('5050');
  expect(process.env['PGPASSWORD']).toBe('test123');
  expect(process.env['PGDATABASE']).toBe('gitbot');
  expect(process.env['GIT_ORGANISATION']).toBe('Team');
  expect(process.env['SLACK_BOT_TOKEN']).toBe('token');
})

test("Loads configuration into environment", () => {
  const testConfig = {
    'User': 'User1',
    'Password': '123456',
    'OtherData': '',
  };

  config_handler.loadConfigIntoEnvironment(testConfig);

  expect(process.env['User']).toBe('User1');
  expect(process.env['Password']).toBe('123456');
  expect(process.env['OtherData']).toBe('');
})