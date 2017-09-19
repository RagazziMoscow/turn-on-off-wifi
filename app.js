var WIFI = require('./lib');

var params = {
  host: '192.168.1.1',
  port: 23,
  username: "admin",
  password: "admin",
  shellPrompt: '#',
  timeout: 2500,
  debug: true
};
var wifi = new WIFI(params);

wifi.change(process.argv[2]);