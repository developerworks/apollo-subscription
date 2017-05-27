import path from 'path'
import log4js from 'log4js'
import express from 'express'

log4js.configure({
  appenders: [{
    type: 'console',
    pattern: '_yyyy-MM-dd',
  }, {
    type: 'file',
    filename: path.resolve(__dirname, '../logs/default.log'),
    // 1G
    maxLogSize: 1024 * 1024 * 1024,
    backups: 3,
    pattern: '_yyyy-MM-dd',
    alwaysIncludePattern: true,
  }],
  replaceConsole: true,
  levels: {
    default: 'DEBUG'
  }
});

let logger = log4js.getLogger();
exports.logger = logger;

exports.configure_logger = (app) => {
  app.use(log4js.connectLogger(logger, {
    level: log4js.levels.INFO
  }));
  const router = express.Router()
  app.use(router);
}
