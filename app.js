var events = require('events');
var chalk = require('chalk');
var telnet = require('telnet-client');
var config = require('./config');
var connection = new telnet();
var wifi = new events.EventEmitter();

var params = config.connection;

connection.on('ready', function(prompt) {
  var cmd = 'ifconfig ra0 ' + process.argv[2];
  connection.exec(cmd, function(err, response) {
    //if (err) wifi.emit('error');

    //if (response) wifi.emit(process.argv[2]);
    wifi.emit(process.argv[2]);
  });
});

connection.on('timeout', function() {
  //console.log('socket timeout!')
  connection.end();
});

connection.on("error", function(err) {
  /* Act on the event */
  wifi.emit('error', err);
});

connection.on('close', function() {
  console.log('connection closed');
});




wifi.on('down', function() {
  console.log('WiFi Выключен');
});

wifi.on('up', function() {
  console.log('WiFi Включён');
});

wifi.on('error', function(err) {

  if (err) console.log(chalk.blue(err));
  console.log(chalk.blue('Ошибка при подключении к роутеру'));
  
});


function init() {

  var validParams = ["up", "down"];
  if (validParams.includes(process.argv[2])) {

    var message = (process.argv[2] == 'up') ? chalk.green.bold("Включить интерфейс WiFi...") : chalk.yellow.bold("Выключить интерфейс WiFi...");
    console.log(message);
    connection.connect(params);

  } else {
    wifi.emit('error');
    console.log("Задайте параметры корректно");
  }
}

init();