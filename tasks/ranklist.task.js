require('dotenv').config()
require('./../db/mongo');
const logger = require('./../logger');
const coderQueue = require('./../queue/coder.queue');
const coderCollection = require('./../models/coder');
const fetch = require('node-fetch');

(async function() {
    try {
        const coder = await coderCollection.find();
        coder.forEach((c) => {
            logger.info(c.Id);
            coderQueue.add({Id: c.Id}, {}, {removeOnComplete: true, removeOnFail: true, attempts: 3, backoff: {type: 'exponential', delay: 1000}});  
        });
        const pong = await (await fetch(process.env.PING_URL)).text();
        logger.info(pong);
        setTimeout(() => {
            logger.info('shutting down');
            process.exit();
        }, 5000);
    } catch (error) {
        logger.error(error);
        process.exit(0);
    }
})();