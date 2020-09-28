const express = require('express');
const router = express.Router();
const ranklistService = require('../services/ranklist.service');
const coderService = require('../services/coder.service');
const coderQueue = require('./../queue/coder.queue');
const logger = require('./../logger');

router.use((req, res, next) => {
    next();
});

router.get('/', async (req, res) => {
    const ranklist = await ranklistService.GetRanklist();
    res.status(200).json(ranklist);
});

router.post('/update', async (req, res) => {
    logger.info('Updating ranklist');
    const coders = await coderService.GetCoders();
    coders.forEach((c) => {
        logger.info(c.Id);
        coderQueue.add({Id: c.Id}, {}, {removeOnComplete: true, removeOnFail: true, attempts: 3, backoff: {type: 'exponential', delay: 1000}});
    });
    logger.info('Submitted request for ranklist update');
    res.status(200).send();
});

module.exports = router;