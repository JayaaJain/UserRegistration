const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(`insert into registeration(firstName, lastName, email, password)
            values(?,?,?,?)`),
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
            ],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result)
            }
    },
    getUsers: callBack => {
        pool.query(`select id, firstName, lastName, email from registeration`,
            [],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },
    getUserById: (id, callBack) => {
        pool.query(`select id, firstName, lastName, email from registeration where id = ?`,
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0])
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(`update registeration set firstName=?, lastName=?, email=?, password=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.id
            ],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result)
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(`delete from registeration where id = ?`,
            [data.id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0])
            }
        );
    },
    getUserByEmail: (email, callBack) => {
        pool.query(`select * from registeration where email = ?`,
        [email],
        (error, results, fields) => {
            if(error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        })
    }
}