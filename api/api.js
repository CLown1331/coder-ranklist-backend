const express = require('express');
const router = express.Router();

const user = require('./User/user.controller');

router.use((req, res, next) => {
    next();
});

router.use('/user', user);

module.exports = router;