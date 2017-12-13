#!/usr/bin/env node
var chalk = require('chalk');
var WIFI = require('./../lib');
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

  const helpCondition = (Object.keys(args).includes('help'));

  if (helpCondition) {
    console.log('Использование: WIFI [up | down] [--port <number>] [--host <host_value>] [--username <user>] [--password <pass>]');
    console.log('up       Включить WIFI');
    console.log('down     Выключить WIFI');
    console.log('port     Задать порт роутера');
    console.log('host     Задать адрес роутера');
    console.log('username Задать пользователя для подключения');
    console.log('password Задать пароль для подключения');
  } else {
    fs.writeFileSync('./config/index.json', JSON.stringify(newConfig));
    console.log(chalk.green('Конфигурация изменена...ОК'));
  }
}
