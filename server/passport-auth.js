const LocalStrategy = require('passport-local').Strategy;
const { sha512 } = require('js-sha512');
const shortid = require('shortid');
const fs = require('fs');
const path = require("path");

const connection = require('./createDbConnection')();
const { getUser } = require('./UserUtils');

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

function register(req, email, password, done) {
    const passwordHash = sha512(password);

    const { first_name, last_name, is_teacher, gender, city_id } = req.body;

    const insertQuery = "INSERT INTO user ( email, password, first_name, last_name, gender, is_teacher, city_id ) values (?,?,?,?,?,?,?)";
    connection.query(insertQuery, [email, passwordHash, first_name, last_name, gender, is_teacher, city_id], function (err, rows) {

        if (err) {
            return done(err);
        }

        let subInsertQueries = [], secondInsertQueriesParams;
        if (is_teacher) {

            const fileName = `${shortid.generate()}.jpg`;
            const { phone, price, subjects } = req.body;
            subInsertQueries.push("INSERT INTO teacher (id, phone, price, image_url) values (?,?,?,?)");
            secondInsertQueriesParams = [rows.insertId, phone, price, `/images/${fileName}`];

            for (let subject of JSON.parse(subjects)) {
                subInsertQueries.push("INSERT INTO teacher_to_subject (teacher_id, subject_id) values (?,?)");
                secondInsertQueriesParams.push(rows.insertId, subject.id);
            }

            writeImageToFolder(req.files, fileName);
        } else {
            const { min_price, max_price, max_km_distance, want_group_lesson } = req.body;
            subInsertQueries.push("INSERT INTO student (id, min_price, max_price, max_km_distance, want_group_lesson) values (?,?,?,?,?)");
            secondInsertQueriesParams = [rows.insertId, min_price, max_price, max_km_distance, want_group_lesson];
        }

        connection.query(subInsertQueries.join(';'), secondInsertQueriesParams, (err) => {
            if (err) {
                return done(err);
            }

            const { password, ...userWithoutPassword } = { id: rows.insertId, ...req.body };

            return done(null, userWithoutPassword);
        });
    });
}

function writeImageToFolder(file, filename) {
    const dir = path.resolve(__dirname, '..', 'public', 'images');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const filePath = path.resolve(dir, filename);

    fs.writeFileSync(filePath, file.image.data);
}