"use strict"
const express = require("express");
const port = process.env.PORT || 8080

const app = express();
const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const winstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(winstonOptions)

app.get('/ping', (req, res) => {
    logger.info('ping-ponged');
    res.send('pong');
});

app.listen(port, () => logger.info(`Example app listening on port ${port}!`))