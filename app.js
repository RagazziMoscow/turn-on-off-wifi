var WIFI = require('./lib');
var config = require('./config');


var params = config.connection;
var wifi = new WIFI(params);

wifi.change(process.argv[2]);