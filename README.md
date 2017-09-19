# turn-on-off-wifi
NodeJS module execiting turn-off/on commands for your WIFI home router
### Install
---
Install with [git](https://git-scm.com/)

```
$ git clone https://github.com/RagazziMoscow/turn-on-off-wifi.git
```
### Using
CD into the main project directory and then type node app.js and command you need for turning on/off for WIFI.
```
node app.js [up | down]
```

### Properties into app.js

```javascript
var params = {
  host: '192.168.1.1',
  port: 23,
  username: "admin",
  password: "admin",
  shellPrompt: '#',
  timeout: 2500,
  debug: true
};
```
