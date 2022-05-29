const { create, getUserById, getUsers, deleteUser, updateUser, getUserByEmail } = require("./user.service");
const crypto = require('./crypto');
const log4js = require('log4js');
var logger = log4js.getLogger();
const  { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        // body.password = crypto.encrypt(new Buffer(body.password, "utf8")).toString('base64');
        create(body, (err, result) => {
            if (err) {
                logger.error('Error: ' + err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, result) => {
            if(err) {
                logger.error("Error: " + err);
                return;
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                data: result
            });
        })
    },
    getUsers: (req, res) => {
        getUsers((err, result) => {
            if(err) {
                logger.error("Error: " + err);
                return;
            }
            return res.json({
                success: 1,
                data: result
            });
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, result) => {
            if(err) {
                logger.error("Error: " + err);
                return;
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                })
            }
            return res.json({
                success: 1,
                message: "Updated successfully!"
            });
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, result) => {
            if(err) {
                logger.error("Error: " + err);
                return;
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                message: "Deleted successfully!"
            });
        })
    }
}