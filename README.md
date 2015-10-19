# winston-koa-logger

> Winston based middleware logger for Koa.

# Instalation
    npm install winston-koa-logger

# Usage
You need to pass a instance of winston to middleware.

    const koa = require('koa');
    const logger = require('./logger'); // Winston instance.
    const winstonKoaLogger = require('winston-koa-logger');

    const app = koa();
    
    app.use(winstonKoaLogger(logger));

    app.use(function *() {
      this.body = 'Hello World';
    });

    app.listen(3000);
