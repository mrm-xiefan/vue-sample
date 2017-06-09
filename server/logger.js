let log4js = require('log4js')
log4js.configure({
  "appenders": [
    {
      "type": "file",
      "category": "system",
      "maxLogSize": 1048576,
      "backups": 5,
      "filename": "system.log"
    },
    {"type": "console"}
  ],
  "levels": {
    "system": "DEBUG"
  },
  "replaceConsole": true
})

module.exports = log4js.getLogger('system')
