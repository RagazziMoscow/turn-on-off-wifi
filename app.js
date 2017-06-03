var chalk = require('chalk');
var telnet = require('telnet-client');
var connection = new telnet();

var params = {
  host: '192.168.1.1',
  port: 23,
  username: "admin",
  password: "admin",
  shellPrompt: '#',
  timeout: 3500,
  debug: true
};

connection.on('ready', function(prompt) {
  var cmd = 'ifconfig ra0 ' + process.argv[2];
  connection.exec(cmd, function(err, response) {
    if (response) console.log(response);
  });
});

connection.on('timeout', function() {
  console.log('socket timeout!')
  connection.end();
});

connection.on("error", function(err) {
  /* Act on the event */
  console.log(chalk.blue(err));
});

connection.on('close', function() {
  console.log('connection closed');
});

function init() {

  var validParams = ["up", "down"];
  if (validParams.includes(process.argv[2])) {

    var message = (process.argv[2] == 'up') ? chalk.green.bold("Включить интерфейс WiFi...") : chalk.yellow.bold("Выключить интерфейс WiFi...");
    console.log(message);
    connection.connect(params);
    
  } else {
    console.log("Задайте параметры корректно");
  }
}

init();