var events = require('events');
var chalk = require('chalk');
var telnet = require('telnet-client');

module.exports = class WIFI extends events.EventEmitter {

  constructor(params) {
    super();
    this.params = params;
    this.connection = new telnet();
    var self = this;

    this.connection.on('ready', function(prompt) {

      var cmd = 'ifconfig ra0 ' + self.cmd;
      this.exec(cmd, function(err, response) {

        //if (err) console.log(err);
        self.emit(self.cmd);
      });
    });

    this.connection.on('timeout', function() {
      //console.log('socket timeout!')
      this.end();
    });

    this.connection.on("error", function(err) {
      /* Act on the event */
      self.emit('error', err);
    });

    this.connection.on('close', function() {
      //console.log('connection closed');
      console.log(chalk.blue('Подключение окончено...'));
    });

    this.on('down', function() {
      console.log(chalk.yellow('WiFi Выключен...ОК'));
    });

    this.on('up', function() {
      console.log(chalk.green('WiFi Включён...ОК'));
    });

    this.on('error', function(err) {

      if (err) console.log(chalk.blue(err));
      console.log(chalk.blue('Ошибка при подключении к роутеру...'));

    });



  }

  change(cmd) {

    var validParams = ["up", "down"];
    if (validParams.includes(cmd)) {

      var message = (cmd == 'up') ?
        chalk.green("Включить интерфейс WiFi...") :
        chalk.yellow("Выключить интерфейс WiFi...");

      console.log(message);
      this.cmd = cmd;
      this.connection.connect(this.params);

    } else {
      this.emit('error');
      console.log("Задайте параметры корректно");
    }
  }
}