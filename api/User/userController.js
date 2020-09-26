const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.post('/login', (req, res) => {
    const userName =  req.body.username;
    const password =  req.body.password;
});

module.exports = router;