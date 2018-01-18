const api = module.exports = require('express').Router();
const passport = require('passport');

const sendOk = (req, res) => {
    res.send(req.user);
};

api.post('/register', passport.authenticate('local-signup', { failureMessage: true }), sendOk)

    .post('/login', passport.authenticate('local-login', { failureMessage: true }), sendOk)

    .get('/user', (req, res) => {
        if (req.user && req.user.email) {
            return res.send(req.user.email);
        }

        return res.status(404).end();
    })

    .get('/logout', (req, res) => {
        req.logout();
        res.sendStatus(200);
    })

    .get('/teachers', (req, res) => {
        res.json(['אבי', 'דני', 'דור', 'בר']);
    })

    // No routes matched? 404.
    .use((req, res) => {
        return res.status(404).end();
    })
