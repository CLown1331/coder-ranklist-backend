'use strict'
const express = require('express');
const logger = require('./logger');
const port = process.env.PORT || 8080;

const app = express();

app.get('/ping', (req, res) => {
    logger.info('ping-ponged');
    res.send('pong');
});

app.listen(port, () => logger.info(`Example app listening on port ${port}!`))