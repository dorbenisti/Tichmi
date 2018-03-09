const LocalStrategy = require('passport-local').Strategy;
const { sha512 } = require('js-sha512');

const connection = require('./createDbConnection')();

// expose this function to our app using module.exports
module.exports = passport => {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        getUser(connection, "id", id, user => {
            return done(null, user);
        }, (error, isCrucial) => {
            if (isCrucial) {
                done(error);
            } else {
                done(null, false, error);
            }
        });
        // connection.query('select * from user where id=?', [id], function (err, rows) {
        //     done(err, rows[0]);
        // });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("select * from user where email=?", [email], function (err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, 'That email is already taken.');
                } else {
                    register(req, email, password, done);
                }
            });
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form

            getUser(connection, "`email`", email, user => {
                const { password: userPassword, ...userWithoutPassword } = user;

                if (userPassword !== sha512(password)) {
                    return done(null, false, 'Oops! Wrong password.');
                }

                return done(null, userWithoutPassword);
            }, (error, isCrucial) => {
                if (isCrucial) {
                    done(error);
                } else {
                    done(null, false, error);
                }
            });
        }));
};

function getUser(connection, whereFieldName, whereFieldValue, callback, errCallback) {
    connection.query(`SELECT * FROM user WHERE ${whereFieldName}=?`, [whereFieldValue], function (err, rows) {
        if (err)
            return errCallback(err, true);
        if (!rows.length) {
            return errCallback('User not found', false);
        }

        const userRow = rows[0];
        const { id, is_teacher } = userRow;

        let queries = [
            `SELECT * FROM ${is_teacher ? 'teacher' : 'student'} WHERE id=?`,
            'SELECT s.id as id, s.display_name as `name` ' +
            'FROM teacher_to_subject m2m, subject s ' +
            'WHERE m2m.subject_id = s.id AND m2m.teacher_id=?'
        ];

        let params = [id, id];

        connection.query(queries.join(';'), params, function (err, results) {
            if (err)
                return errCallback(err, true);
            if (!results[0].length) {
                return errCallback('User not found', false);
            }

            callback({ ...userRow, ...results[0][0], subjects: results[1] });
        });
    });
}

function register(req, email, password, done) {
    let newUserMysql = new Object();

    const passwordHash = sha512(password);

    newUserMysql.email = email;
    newUserMysql.password = passwordHash;

    const { first_name, last_name, is_teacher, gender, city_id, subjects } = req.body;

    const insertQuery = "INSERT INTO user ( email, password, first_name, last_name, gender, is_teacher, city_id ) values (?,?,?,?,?,?,?)";
    connection.query(insertQuery, [email, passwordHash, first_name, last_name, gender, is_teacher, city_id], function (err, rows) {

        if (err) {
            return done(err);
        }

        let subInsertQueries = [], secondInsertQueriesParams;
        if (is_teacher) {
            const { phone, price } = req.body;
            subInsertQueries.push("INSERT INTO teacher (id, phone, price) values (?,?,?)");
            secondInsertQueriesParams = [rows.insertId, phone, price];
        } else {
            const { min_price, max_price, max_km_distance, want_group_lesson } = req.body;
            subInsertQueries.push("INSERT INTO student (id, min_price, max_price, max_km_distance, want_group_lesson) values (?,?,?,?,?)");
            secondInsertQueriesParams = [rows.insertId, min_price, max_price, max_km_distance, want_group_lesson];
        }

        for (let subject of subjects) {
            subInsertQueries.push("INSERT INTO teacher_to_subject (teacher_id, subject_id) values (?,?)");
            secondInsertQueriesParams.push(rows.insertId, subject.id);
        }

        connection.query(subInsertQueries.join(';'), secondInsertQueriesParams, (err2, rows2) => {
            if (err2) {
                return done(err2);
            }

            const { password, ...userWithoutPassword } = { ...newUserMysql, id: rows.insertId, ...rows2[0][0], subjects };

            return done(null, userWithoutPassword);
        });
    });
}