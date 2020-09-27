const express = require('express');
const router = express.Router();
const ranklistService = require('../services/ranklist.service');

router.use((req, res, next) => {
    next();
});

router.get('/', async (req, res) => {
    const ranklist = await ranklistService.GetRanklist();
    res.status(200).json(ranklist);
});

module.exports = router;