function getUser(connection, whereFieldName, whereFieldValue, callback, errCallback) {
    connection.query(`SELECT u.*, c.name as city_name FROM user u, city c WHERE c.id=u.city_id AND u.${whereFieldName}=?`, [whereFieldValue], function (err, rows) {
        if (err)
            return errCallback(err, true);
        if (!rows.length) {
            return errCallback('User not found', false);
        }

        const userRow = rows[0];
        const { id, is_teacher } = userRow;

        let queries = [
            `SELECT * FROM ${is_teacher ? 'teacher' : 'student'} WHERE id=?`
        ];

        let params = [id];

        if (is_teacher) {
            queries.push('SELECT s.id as id, s.display_name as `name` ' +
            'FROM teacher_to_subject m2m, subject s ' +
            'WHERE m2m.subject_id = s.id AND m2m.teacher_id=?');
            params.push(id);
        }

        connection.query(queries.join(';'), params, function (err, results) {
            if (err)
                return errCallback(err, true);

            const specializedUserDetails = is_teacher ? results[0][0] : results[0];

            if (!specializedUserDetails) {
                return errCallback('User not found', false);
            }

            let extra = {};

            if (is_teacher) {
                extra = { subjects: results[1] };
            }

            callback({ ...userRow, ...specializedUserDetails, ...extra });
        });
    });
}

function getAllTeachers(connection, callback, errCallback) {
    connection.query('SELECT ID from user where is_teacher=1', (err, rows) => {
        if (err)
            return errCallback(err, true);
        if (!rows.length) {
            return callback([]);
        }

        let numOfCallbacks = 0;
        let allTeachers = [];

        const successCallback = teacher => {
            wrapWithNumOfCallbacks(() => {
                allTeachers.push(teacher);
            });
        };

        const errorCallback = err => {
            wrapWithNumOfCallbacks(() => {
            });
        }

        const wrapWithNumOfCallbacks = (cbk) => {
            numOfCallbacks++;

            cbk();

            if (numOfCallbacks === rows.length) {
                callback(allTeachers);
            }
        }


        for (let teacher of rows) {
            const { ID } = teacher;

            getUser(connection, 'id', ID, successCallback, errorCallback);
        }
    });
}

module.exports = {
    getUser,
    getAllTeachers
};