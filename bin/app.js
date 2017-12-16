#!/usr/bin/env node

var chalk = require('chalk');
var path = require('path');
var WIFI = require('./../lib');
var fs = require('fs');

const argv = require('yargs')
  .command('up', 'turn on wifi')
  .command('down', 'turn off wifi')
  .command('config', 'write config options', (yargs) => {
    yargs.positional('port', {
      describe: 'a unique number for the port',
      type: 'number',
      default: 23
    });
    yargs.positional('host', {
      describe: 'a unique identifier for the host',
      type: 'string',
      default: '192.168.1.1'
    });
    yargs.positional('username', {
      describe: 'string containing username',
      type: 'string',
      default: 'admin'
    });
    yargs.positional('password', {
      describe: 'string containing password',
      type: 'string',
      default: 'admin'
    });
  }, (argv) => {
    const configFilePath = path.join(__dirname, '../config/index.json');
    const host = argv.host;
    const port = argv.port;
    const username = argv.username;
    const password = argv.password;
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
    fs.writeFileSync(configFilePath, JSON.stringify(newConfig));
    console.log(chalk.green('Конфигурация изменена...ОК'));
  })
  .help()
  .argv;



const commands = argv['_'];
const connectCondition = (commands.includes('up') || commands.includes('down'));
if (connectCondition) {
  const configFilePath = path.join(__dirname, '../config/index.json');
  const params = JSON.parse(fs.readFileSync(configFilePath));
  var wifi = new WIFI(params);
  wifi.change(argv['_'][0]);
}