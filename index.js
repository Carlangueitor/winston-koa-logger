'use strict';
const tty = require('tty');
const chalk = require('chalk');


const STATUS_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green'
};


/**
 * Logger
 *
 * @param {object} winstonInstance
 */
function logger(winstonInstance, {useColors=(tty.isatty(1) && process.env.NODE_ENV !== 'production')}={}) {
  return function *middleWare(next) {
    const start = new Date();
    yield next;
    const ms = new Date() - start;

    let logLevel;
    if(this.status >=500) { logLevel = 'error'; }
    else if(this.status >=400) { logLevel = 'warn'; }
    else if(this.status >=100) { logLevel = 'info'; }
    
    const msgOne = `${this.method} ${this.originalUrl}`;
    const msgTwo = ` ${this.status} `;
    const msgThree = `${ms}ms`;
    
    const msgWithColors = (chalk.gray(msgOne) +
               chalk[STATUS_COLORS[logLevel]](msgTwo) +
               chalk.gray(msgThree));
    
    const msgWithoutColors = msgOne + msgTwo + msgThree;

    winstonInstance.log(logLevel, useColors ? msgWithColors : msgWithoutColors);
  };
}


module.exports = logger;
