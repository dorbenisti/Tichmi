const api = module.exports = require('express').Router();
const passport = require('passport');

const openConnection = require('./createDbConnection');
const { getAllTeachers, getUser } = require('./UserUtils');
const GeneticAlgorithm = require("./ourGeneticAlgo");

const sendOkWithUser = (req, res) => {
    res.send(req.user);
};

api.post('/register', passport.authenticate('local-signup', { failureMessage: true }), sendOkWithUser)

    .post('/login', passport.authenticate('local-login', { failureMessage: true }), sendOkWithUser)

    .get('/user', (req, res) => {
        if (req.user) {
            const {password, ...userWithoutPassword} = req.user;
            return res.send(userWithoutPassword);
        }

        return res.sendStatus(404).end();
    })

    .get('/logout', (req, res) => {
        req.logout();
        res.sendStatus(200);
    })

    .get('/teacher/:id', (req, res) => {
        useDbConnection((conn, end) => {
            getUser(conn, 'id', req.params.id, teacher => {
                const { password, ...teacherWithoutPassword } = teacher;
                res.json(teacherWithoutPassword);
                end();
            }, (err) => {
                res.sendStatus(500).send(err);
                end();
            });
        }, true);
    })

    .get('/didUserRateTeacher/:teacherId', (req, res) => {
        const { teacherId } = req.params;

        useDbConnection((conn, end) => {
            conn.query('select student_id from review where student_id=? AND teacher_id=?', [req.user.id, teacherId], (err, rows) => {
                if (err) {
                    return res.status(500).send(err);
                }

                res.json(!!rows.length);
            });
        }, true);
    })

    .get('/teachers', (req, res) => {
        useDbConnection((conn, end) => {
            getAllTeachers(conn, teachers => {
                res.json(teachers);
                end();
            }, (err) => {
                res.sendStatus(500).send(err);
                end();
            });
        }, true);
    })

    .get('/cities', (req, res) => {
        useDbConnection(conn => {
            conn.query('select id, name from city order by `name` ASC', (err, rows) => {
                if (err) {
                    return res.sendStatus(500).send(err);
                }

                res.json(rows);
            });
        });
    })

    .get('/subjects', (req, res) => {
        useDbConnection(conn => {
            conn.query('select id, display_name as `name` from subject order by `display_name` ASC', (err, rows) => {
                if (err) {
                    return res.sendStatus(500).send(err);
                }

                res.json(rows);
            });
        });
    })

    .post('/review', (req, res) => {
        if (!req.user || req.user.is_teacher) {
            return res.sendStatus(401).end();
        }

        const { id: studentId } = req.user;
        const { teacherId, ratings, reviewText } = req.body;

        useDbConnection((conn, end) => {
            conn.query('INSERT INTO review (teacher_id, student_id, rating, content) values (?,?,?,?)',
                [teacherId, studentId, ratings, reviewText], (err, rows) => {
                    end();

                    if (err) {
                        return res.status(500).send(err);
                    }

                    return res.sendStatus(200).end();
                })
        }, true);
    })

    .get('/relevant-teachers/:subjectId', (req, res) => {
        if (!req.user || req.user.is_teacher) {
            return res.sendStatus(401).end();
        }

        const { subjectId } = req.params;

        const queries = [
            `
            SELECT lon, lat
            FROM city c, user u
            WHERE u.city_id=c.id AND u.id=?
            `,
            `
            SELECT t.id, c.lon, c.lat, t.price, u.group_lesson, avgs.avgRating
            FROM user u, teacher t, city c, teacher_to_subject tts,
                ((SELECT t.id, avg(r.rating) avgRating
                 FROM teacher t, review r
                 WHERE t.id=r.teacher_id
                 GROUP BY t.id)
                 UNION
                 (SELECT t.id, 0
                  FROM teacher t
                  where t.id NOT IN (SELECT teacher_id from review))) avgs
            WHERE u.id=t.id AND
                  u.city_id=c.id AND
                  tts.teacher_id=t.id AND
                  avgs.id=t.id AND
                  tts.subject_id=? AND
                  t.price >= ?
            `
        ];

        const params = [req.user.id, +subjectId, req.user.min_price];

        useDbConnection((conn, end) => {
            conn.query(queries.join(';'), params, (err, results) => {
                if (err) {
                    end();
                    return res.status(500).send(err);
                }

                const student = { ...req.user, ...results[0][0] };
                const teachers = results[1];

                if (!teachers.length) {
                    end();
                    return res.json([]);
                }

                GeneticAlgorithm(student, teachers, {distance: 10}).then(results => {
                    const teachersResultsArr = [];

                    const cbk = teacher => {
                        const { password, ...teacherWithoutPassword } = teacher;
                        teachersResultsArr.push(teacherWithoutPassword);

                        if (teachersResultsArr.length === results.length) {
                            end();
                            res.json(teachersResultsArr);
                        }
                    };

                    for (let teacher of results) {
                        const { id } = teacher;

                        getUser(conn, 'id', id, cbk, err => res.status(500).send(err));
                    }
                }, err => res.status(500).send(err));
            });
        }, true)
    });

function useDbConnection(callback, isAsync = false) {
    let connection = null;

    const closeConn = () => connection && connection.end();
    const currCloseConn = isAsync ? () => { } : closeConn;

    try {
        connection = openConnection();
        callback(connection, closeConn);
    } finally {
        currCloseConn();
    }
}