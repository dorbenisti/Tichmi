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
            if (!results[0].length) {
                return errCallback('User not found', false);
            }

            let extra = {};

            if (results[1]) {
                extra = { subjects: results[1] };
            }

            callback({ ...userRow, ...results[0][0], ...extra });
        });
    });
}

module.exports = {
    getUser
};