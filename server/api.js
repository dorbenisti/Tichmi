const api = module.exports = require('express').Router();
const passport = require('passport');

api.get('/express-test', (req, res) => res.send({ express: 'working!' })) //demo route to prove api is working

    // process the signup form
    .post('/register', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/register',
    }))

    // process the login form
    .post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
    }))

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
