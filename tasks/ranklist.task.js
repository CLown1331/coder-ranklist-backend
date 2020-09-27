require('dotenv').config()
require('./../db/mongo');
const logger = require('./../logger');
const coderQueue = require('./../queue/coder.queue');
const coderCollection = require('./../models/coder');

(async function() {
    try {
        const coder = await coderCollection.find();
        coder.forEach((c) => {
            logger.info(c.Id);
            coderQueue.add({Id: c.Id});  
        });
        setTimeout(() => {
            logger.info('shutting down');
            process.exit();
        }, 5000);
    } catch (error) {
        logger.error(error);
        process.exit(0);
    }
})();