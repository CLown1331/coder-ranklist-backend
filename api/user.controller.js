const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

router.use((req, res, next) => {
    next();
});

router.post('/login', async (req, res) => {
    const email =  req.body.email;
    const password =  req.body.password;
    if (!(await authService.VerifyPassword(email, password))) {
        res.status(400).json({
            Message: 'Email or Password invalid',
        });
    } else {
        res.status(200).json(authService.IssueToken(email));
    }
});

module.exports = router;