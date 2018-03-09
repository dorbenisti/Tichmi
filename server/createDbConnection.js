const mysql = require('mysql');
const os = require('os');

module.exports = () => {

    const request = {
        host: 'localhost',
        user: 'root',
        password: '1234',
        multipleStatements: true
    };

    // Patch for Avi - my work machine DB doesn't have a password :(
    if (os.hostname() === 'MTLVIT1031045') {
        delete request.password;
    }

    const connection = mysql.createConnection(request);

    connection.query('USE tichmi');

    return connection;
};