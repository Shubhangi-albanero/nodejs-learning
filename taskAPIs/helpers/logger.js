const log4js = require("log4js")
const logger = log4js.getLogger()
log4js.configure({
    appenders: {fileAppender: {type: 'file', filename: './logs/app.log'}},
    categories: {default: { appenders: ['fileAppender'], level: 'info'}}
})
logger.level = 'info'


module.exports = logger;
