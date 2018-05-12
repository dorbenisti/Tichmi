const api = module.exports = require('express').Router();
const passport = require('passport');

const openConnection = require('./createDbConnection');
const { getAllTeachers, getUser } = require('./UserUtils');

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

    .get('/teacher/:id', (req, res) => {
        useDbConnection((conn, end) => {
            getUser(conn, 'id', req.params.id, teacher => {
                res.json(teacher);
                end();
            }, (err) => {
                res.status(500).send(err);
                end();
            });
        }, true);
    })

    .get('/teachers', (req, res) => {
        useDbConnection((conn, end) => {
            getAllTeachers(conn, teachers => {
                res.json(teachers);
                end();
            }, (err) => {
                res.status(500).send(err);
                end();
            });
        }, true);
    })

    .get('/cities', (req, res) => {
        useDbConnection(conn => {
            conn.query('select id, name from city order by `name` ASC', (err, rows) => {
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

function useDbConnection(callback, isAsync=false) {
    let connection = null;

    const closeConn = () => connection && connection.end();
    const currCloseConn = isAsync ? () => {} : closeConn;

    try {
        connection = openConnection();
        callback(connection, closeConn);
    } finally {
        currCloseConn();
    }
}