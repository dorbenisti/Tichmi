const api = module.exports = require('express').Router();
const passport = require('passport');

const openConnection = require('./createDbConnection');

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

    .get('/cities', (req, res) => {
        useDbConnection(conn => {
            conn.query('select * from city order by `name` ASC', (err, rows) => {
                if (err) {
                   return res.status(500).send(err);
                }

                res.json(rows);
            });
        });
    })

    .get('/subjects', (req, res) => {
        useDbConnection(conn => {
            conn.query('select id, display_name as `name` from subject order by `display_name` ASC', (err, rows) => {
                if (err) {
                   return res.status(500).send(err);
                }

                res.json(rows);
            });
        });
    })

    // No routes matched? 404.
    .use((req, res) => {
        return res.status(404).end();
    });

function useDbConnection(callback) {
    let connection = null;

    try {
        connection = openConnection();
        callback(connection);
    } finally {
        connection && connection.end();
    }
}