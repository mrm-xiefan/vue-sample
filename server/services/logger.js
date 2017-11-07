import log4js from 'log4js'
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

export default log4js.getLogger('system')
