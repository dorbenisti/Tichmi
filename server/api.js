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

// No routes matched? 404.
.use((req, res) => {
    return res.status(404).end();
})
