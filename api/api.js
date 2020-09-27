const express = require('express');
const router = express.Router();

const user = require('./user.controller');
const coder = require('./coder.controller');
const ranklist = require('./ranklist.controller');

router.use((req, res, next) => {
    next();
});

router.use('/user', user);
router.use('/coder', coder);
router.use('/ranklist', ranklist);

module.exports = router;