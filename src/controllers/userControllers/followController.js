const User = require("../../models/user");
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
    //accessible by req.username
    //should update follwers array of {username} with username passed in body
    //of request, then do the same for the opposite

    const sourceUsername = req.username;
    const targetUsername = req.body.targetUsername;

    const sourceUserId = await globalFunctions.usernameToUserId(sourceUsername);
    const targetUserId = await globalFunctions.usernameToUserId(targetUsername);

    if (targetUserId) {
        //updating the 'follwing' of the source user
        await User.findOneAndUpdate(
            { username: `${sourceUsername}` },
            { $addToSet: { following: { relatedUserId: targetUserId } } },
            { new: true})
            .then(async sourceResult => {
                sourceResult.self = `http://localhost:3000/users/${sourceUsername}`;
                await User.findOneAndUpdate(
                    { username: `${targetUsername}` },
                    { $addToSet: { followers: { relatedUserId: sourceUserId } } },
                    { new: true})
                    .then(targetResult => {
                        targetResult.self = `http://localhost:3000/users/${targetUsername}`
                        console.log(`${sourceUsername} followed ${targetUsername} successfully`);
                        res.status(201).json({
                            success: true,
                            message: `${sourceUsername} followed ${targetUsername}`,
                            sourceUser: sourceResult,
                            targetUser: targetResult
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            })
            .catch(err => {
                console.log(`error updating ${sourceUsername}'s following array`);
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
    else {
        console.log(`username ${targetUsername} not found in db`);
        res.status(404).json({
            success: false,
            message: `target username ${targetUsername} not found in db`,
            sourceUser: {
                username: sourceUsername,
                objectId: sourceUserId,
                self: `http://localhost:3000/users/${sourceUsername}`
            }
        });
    }
}

const unfollowUser = async (req, res) => {
    //response should return list of updated followers for user: username
    //accessible by req.params.username
    //should update follwers array of {username} with username passed in body
    //of request, then do the same for the opposite
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