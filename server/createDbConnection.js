const mysql = require('mysql');

module.exports = () => {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        //password : '1234'
      });

    connection.query('USE tichmi');	

    return connection;
};