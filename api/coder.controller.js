const express = require('express');
const router = express.Router();
const coderService = require('../services/coder.service');
const coderQueue = require('./../queue/coder.queue');
const passport = require('./../passport/passport');

router.use((req, res, next) => {
    next();
});

router.post('/upsert', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const id = req.body.Id;
    const payload = req.body.Payload;
    if (!id) {
        res.status(400).json({
            'Message': 'No Id',
        });
        return;
    }
    if (!payload) {
        res.status(400).json({
            'Message': 'No payload',
        });
        return;
    }
    await coderService.Upsert(id, payload);
    coderQueue.add({Id: id}, {}, {removeOnComplete: true, removeOnFail: true, attempts: 3, backoff: {type: 'exponential', delay: 1000}});
    res.status(200).json(payload);
});

module.exports = router;