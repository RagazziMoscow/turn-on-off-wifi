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
```
wifi-router [up | down] [view-config] [config <host> <port> <username> <password> <interface>]

up           turn on wifi
down         turn off wifi
view-config  print config options
config       write config options
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
