const winston = require('winston');
const appRoot = require('app-root-path');
const logger = winston.createLogger({
  level: 'info',
  // handleExceptions: true,
  // json: true,
  // maxsize: 5242880, // 5MB
  // maxFiles: 5,
  // colorize: false,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${appRoot}/logs/error.log`,
      json: true,
      handleExceptions: true,
      colorize: false,
      level: 'error'
    }),
    new winston.transports.File({
      filename: `${appRoot}/logs/combined.log`
    })
  ]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.json()
  }));
}

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
}

module.exports = logger;