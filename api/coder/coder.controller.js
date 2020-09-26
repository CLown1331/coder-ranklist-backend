const express = require('express');
const router = express.Router();
const coderService = require('../../services/coder.service');
const coderQueue = require('./../../queue/coder.queue');

router.use((req, res, next) => {
    next();
});

router.post('/upsert', async (req, res) => {
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
    coderQueue.add({Id: id});
    res.status(200).send();
});

module.exports = router;