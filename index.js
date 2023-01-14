const express = require('./config/express');
const {logger} = require('./config/winston');

let port;

if(process.env.NODE_ENV === "production") {
  port = 3000; // prod서버 포트
} else {
  port = 4000; // local, dev서버 포트
}

express().listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);