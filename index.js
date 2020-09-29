require('dotenv').config()
require('./db/mongo');
const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = process.env.PORT || 8080;
const coderQueue = require('./queue/coder.queue');
const coderJob = require('./jobs/coder.job');
const allowedOriginService = require('./services/allowedOrigin.service');
const ratingFormulaService = require('./services/ratingFormula.service');
coderQueue.process(coderJob);

const api = require('./api/api');

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        allowedOriginService.GetAllowedOrigins().then(res => {
            callback(null, res);            
        }, err => {
            callback(err, false);
        })
    },
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

app.get('/ping', (req, res) => {
    logger.info('ping-ponged');
    res.send('pong');
});

app.use('/api', api);

app.listen(port, () => logger.info(`Example app listening on port ${port}!`))