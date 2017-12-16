#!/usr/bin/env node

var chalk = require('chalk');
var path = require('path');
var WIFI = require('./../lib');
var fs = require('fs');

const configFilePath = path.join(__dirname, '../config/index.json');
const params = JSON.parse(fs.readFileSync(configFilePath));

const argv = require('yargs')
  .command('up', 'turn on wifi')
  .command('down', 'turn off wifi')
  .command('view-config', 'print config options', (yargs) => {}, (argv) => {
    console.log(chalk.green('Конфигурация подключения:'));
    console.log(`Хост:         ${params.host}`);
    console.log(`Порт:         ${params.port}`);
    console.log(`Пользователь: ${params.username}`);
    console.log(`Пароль:       ${params.password}`);
  })
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
  var wifi = new WIFI(params);
  wifi.change(argv['_'][0]);
}