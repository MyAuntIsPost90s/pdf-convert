const log4js = require("log4js");

let logger = null;

function init() {
  if (!logger) {
    log4js.configure({
      replaceConsole: true,
      appenders: {
        stdout: {//控制台输出
          type: 'stdout'
        },
        file: {//请求日志
          type: 'dateFile',
          filename: 'logs/pdf-convert/info',
          pattern: 'yyyy-MM-dd.log',
          alwaysIncludePattern: true
        },
      },
      categories: {
        default: { appenders: ['stdout', 'file'], level: 'debug' }
      }
    });
    logger = log4js.getLogger();
  }
}
init();

module.exports = {
  error: (msg, args) => {
    logger.error(msg, args)
  },
  info: (msg) => {
    logger.info(msg)
  }
}