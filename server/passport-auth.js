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
        connection.query('select * from user where id=?', [id], function (err, rows) {
            done(err, rows[0]);
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

                    // if there is no user with that email
                    // create the user
                    let newUserMysql = new Object();

                    const passwordHash = sha512(password);

                    newUserMysql.email = email;
                    newUserMysql.password = passwordHash;

                    const insertQuery = "INSERT INTO user ( email, password ) values (?,?)";
                    connection.query(insertQuery, [email, passwordHash], function (err, rows) {

                        if (err) {
                            return done(err);
                        }
                        
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
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

            connection.query("SELECT * FROM `user` WHERE `email`=?", [email], function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, {message :'No user found.' }); 
                }

                // if the user is found but the password is wrong
                if (rows[0].password !== sha512(password))
                    return done(null, false, 'Oops! Wrong password.');

                // all is well, return successful user
                return done(null, rows[0]);

            });
        }));

};