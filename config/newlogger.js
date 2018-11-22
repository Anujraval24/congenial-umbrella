
var winston = require('winston');
var configs = require('./env.js');

var debug = new winston.Logger({
  levels: {
    debug: 0
  },
  transports: [
    new (winston.transports.File)({ filename: configs.PATH_TO_LOG, level: 'debug'}),
    new (winston.transports.Console)({level: 'debug'})
  ]
});

var info = new winston.Logger({
  levels: {
    info: 1
  },
  transports: [
    new (winston.transports.File)({ filename: configs.PATH_TO_LOG, level: 'info'}),
    new (winston.transports.Console)({level: 'info'})
  ]
});

var warn = new winston.Logger({
  levels: {
    warn: 2
  },
  transports: [
    new (winston.transports.File)({ filename: configs.PATH_TO_LOG, level: 'warn'}),
    new (winston.transports.Console)({level: 'warn'})
  ]
});

var error = new winston.Logger({
  levels: {
    error: 3
  },
  transports: [
    new (winston.transports.File)({ filename: configs.PATH_TO_LOG, level: 'error'}),
    new (winston.transports.Console)({level: 'error'})
  ]
});

var exports = {
  debug: function(msg){
    debug.debug(msg);
  },
  info: function(msg){
    info.info(msg);
  },
  warn: function(msg){
    warn.warn(msg);
  },
  error: function(msg){
    error.error(msg);
  },
  log: function(level,msg){
    var lvl = exports[level];
    lvl(msg);
  }
};

module.exports = exports;