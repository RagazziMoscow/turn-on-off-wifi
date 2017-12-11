var chalk = require('chalk');
var WIFI = require('./lib');
var fs = require('fs');

const minimist = require('minimist');
const params = JSON.parse(fs.readFileSync('./config/index.json'));

const args = minimist(process.argv.slice(2));
const connectCondition = (args['_'][0] == 'down' || args['_'][0] == 'up');

if (connectCondition) {
  var wifi = new WIFI(params);
  wifi.change(args['_'][0]);
} else {

  // config
  const host = args['host'] || params['host'];
  const port = args['port'] || params['port'];
  const username = args['username'] || params['username'];
  const password = args['password'] || params['password'];
  const shellPrompt = '#';
  const timeout = 2500;
  const debug = true;
  const newConfig = {
    host,
    port,
    username,
    password,
    shellPrompt,
    timeout,
    debug
  };

  fs.writeFileSync('./config/index.json', JSON.stringify(newConfig));
  console.log(chalk.green('Конфигурация изменена...ОК'));
}