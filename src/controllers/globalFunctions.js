const mongoose = require('mongoose');
const User = require("../models/user");

// const usernameToUserId = async (username) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await User.findOne({ username });
//             if (user) {
//                 resolve(user._id);
//             } else {
//                 reject(new Error(`No user found with username: ${username}`));
//             }
//         } catch (error) {
//             console.error(error);
//             reject(new Error("global function went wrong"));
//         }
//     });
// };




const usernameToUserId = async (username) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ username: `${username}` })
            .exec()
            .then(result => {
                
                //resolve(result);
                if (result) {
                    //console.log(result);
                    resolve(result._id);
                }
                else {
                    console.log(`no user was found`);
                    reject(new Error(`no user was found`));
                }
            })
            .catch(err => {
                console.log(err);
                reject(new Error("global function went wrong"));
            });
    });
};


module.exports = {
    usernameToUserId
}