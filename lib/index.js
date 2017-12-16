var chalk = require('chalk');
var Telnet = require('telnet-client');

module.exports = class WIFI extends Telnet {

  constructor(params) {
    super();
    this.params = params;
    var self = this;

    this.on('ready', function(prompt) {
      const cmd = `ifconfig ${self.params.interface} ${self.cmd}`;
      this.exec(cmd, function(err, response) {

        //if (err) console.log(err);
        self.emit(self.cmd);
      });
    });

    this.on('timeout', function() {
      //console.log('socket timeout!')
      this.end();
    });

    this.on("error", function(err) {
      /* Act on the event */
      console.log(err);
    });

    this.on('close', function() {
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
      this.connect(this.params);

    } else {
      this.emit('error');
      console.log("Задайте параметры корректно");
    }
  }
}