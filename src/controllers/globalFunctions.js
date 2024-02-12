const mongoose = require('mongoose');
const User = require("../models/user");


const usernameToUserId = async (username) => {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ username: `${username}` })
            .exec()
            .then(result => {
                if (result) {
                    resolve(result._id);
                }
                else {//enters else when user does not exist in db
                    reject(new Error("global function usernameToUserId went wrong"));
                }
            })
            .catch(err => {//should never get here
                console.log(err);
                reject(new Error("global function usernameToUserId went wrong"));
            });
    })
    .then(resultId => {
        console.log(resultId);
        return resultId;
    })
    .catch(() => {
        return null;
    });
};


module.exports = {
    usernameToUserId
}