const express = require('express');
const router = express.Router();

const user = require('./user/user-controller');
const coder = require('./coder/coder.controller');

router.use((req, res, next) => {
    next();
});

router.use('/user', user);
router.use('/coder', coder);

module.exports = router;