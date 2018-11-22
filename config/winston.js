var appRoot = require('app-root-path');
var winston = require('winston');
const { createLogger, format, transports} = require('winston');
const { combine, timestamp, label, printf} = format;

var options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: 'debug',
    filename: `${appRoot}/logs/debug.log`,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  file: {
    level: 'info',
    handleExceptions: true,
    filename: `${appRoot}/logs/info.log`,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: true,
  },
  file: {
    level: 'warn',
    filename: `${appRoot}/logs/warn.log`,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: true,
  }
};

const myformat = printf(info => {
  return `TimeStamp: ${info.timestamp} - ${info.level}: ${info.message}`;
});

// var logger = winston.createLogger({
//   format: combine(
//     label({
//       label: ['New Log']
//     }),
//     format.timestamp({
//       format: 'DD-MM-YYYY hh:mm:ss'
//     }),
//     myformat,
//     exceptionHandlers: {filename: 'logs/exceptions.log'},
//   ),
//   transports: [
//     new winston.transports.File(options.file),
//     new winston.transports.Console(options.console),
//   ],
// });

var logger = winston.createLogger({
  format: combine(
    format.timestamp({
      format: 'DD-MM-YYYY hh:mm:ss'
    }),
  myformat,
  ),
transports: [
  new winston.transports.File({
    name: 'info-file',
    level: 'info',
    filename: 'logs/app.log',
    json: true,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    colorize: false
  }),
  new winston.transports.File({
    name: 'error-file',
    level: 'error',
    filename: 'logs/error.log',
    json: true,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    colorize: false
  }),
  new winston.transports.File({
    name: 'request-file',
    level: 'request',
    filename: 'logs/requests.log',
    json: true,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    colorize: false
  }),
  new winston.transports.File(options.file),
  new winston.transports.Console(options.console)
],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.json(),
    format: winston.format.combine(),
    format: winston.format.colorize(), 
  })); 
}

logger.stream = {
  write: function (message, encoding) {
    logger.info(message, encoding);
  }
};
module.exports = logger;