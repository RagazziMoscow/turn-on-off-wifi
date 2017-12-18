# turn-on-off-wifi
NodeJS module turning-off/on WIFI on your home router
### Install
---
Install with [git](https://git-scm.com/)
```
$ git clone https://github.com/RagazziMoscow/turn-on-off-wifi.git .
$ npm install -g .
```
### Using
CD into the main project directory and then type node app.js and command you need for turning on/off for WIFI.

wifi-router up           turn on wifi
wifi-router down         turn off wifi
wifi-router view-config  print config options
wifi-router config       write config options
```
wifi-router [up | down] [view-config] [config <host> <port> <username> <password> <interface>]
```

### Properties into config/index.json file (By Default)

```javascript
{
  "host": "192.168.1.1",
  "por"t: 23,
  "username": "admin",
  "password": "admin",
  "interface": "ra0",
  "shellPrompt": '#'
}
```
