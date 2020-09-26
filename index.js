require('dotenv').config()
require('./db/mongo');
const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT || 8080;

const api = require('./api/api');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    logger.info('ping-ponged');
    res.send('pong');
});

app.use('/api', api);

app.listen(port, () => logger.info(`Example app listening on port ${port}!`))