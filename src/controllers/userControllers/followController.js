const User = require("../../models/user");
const Follow = require("../../models/follow");
const globalFunctions = require("../globalFunctions");

// const followUser = async (req, res, next) => {
//     console.log(req.params);
//     const sourceUsername = req.username;
//     const targetUsername = req.body.targetUsername;

//     try {
//         const targetUserId = await globalFunctions.usernameToUserId(targetUsername);
//         if (targetUserId) {
//             // Update the 'following' of the source user
//             await User.findOneAndUpdate(
//                 { username: sourceUsername },
//                 { $push: { following: targetUserId } }
//             );
//             console.log(`User ${sourceUsername} is following user ${targetUsername} successfully`);
//             res.status(201).json({ message: `User ${sourceUsername} is following user ${targetUsername} successfully` });
//         } else {
//             console.log(`User ${targetUsername} not found`);
//             res.status(404).json({ message: `User ${targetUsername} not found` });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };




const followUser = async (req, res) => {
    //response should return list of updated followers for user: username
    //accessible by req.params.username
    //should update follwers array of {username} with username passed in body
    //of request, then do the same for the opposite

    const sourceUsername = req.username;
    const targetUsername = req.body.targetUsername;
    const targetUserId = await globalFunctions.usernameToUserId(targetUsername);
    console.log(targetUserId);
    const targetUserIdString = targetUserId.toString();

    if (targetUserId) {
        //updating the 'follwing' of the source user

        await User.findOneAndUpdate(
            { username: `${sourceUsername}` },
            { $push: { following: {
                relatedUserId: targetUserId }
            } }
        )
        .exec()
        .then(result => {
                console.log(`User ${sourceUsername} followed ${targetUsername} successfully`);
                res.status(201).json({
                    returnedResult: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
    else{
        console.log("something went wrong");
        res.status(404).json({
            message: "something went wrong"
        });
    }






    /*
    Ideally here it would be nice to call a global function that takes in the above
    arguments, performs the mongo queries and returns some object indicating success
    or failure of operation.
    */
}

const unfollowUser = async (req, res) => {

}

const getFollowing = async (req, res) => {
    //response should return list of all followings for user: username
    //accessible by req.params.username
}

const getFollowers = async (req, res) => {

}

module.exports = {
    followUser,
    unfollowUser,
    getFollowing,
    getFollowers
}