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
        const tokenResponse = authService.IssueToken(email);
        res.cookie('token', tokenResponse.access_token, {
            maxAge: process.env.COOKIE_EXPIRES_IN,
            httpOnly: true
        });
        res.status(200).json(tokenResponse);
    }
});

module.exports = router;