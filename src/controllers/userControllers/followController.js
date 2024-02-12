const User = require("../../models/user");
const globalFunctions = require("../globalFunctions");

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
        //updating the 'following' of the source user

        await User.findOneAndUpdate(
            { username: `${sourceUsername}` },
            { $addToSet: { following: {
                userId: targetUserId,
                username: targetUsername,
                self: `http://localhost:3000/users/${targetUsername}`
            }} },
            { new: true})
            .then(async sourceResult => {
                await User.findOneAndUpdate(
                    { username: `${targetUsername}` },
                    { $addToSet: { followers: {
                        userId: sourceUserId,
                        username: sourceUsername,
                        self: `http://localhost:3000/users/${sourceUsername}`
                    } } },
                    { new: true})
                    .then(targetResult => {
                        console.log(`${sourceUsername} followed ${targetUsername} successfully`);
                        res.status(201).json({
                            success: true,
                            message: `${sourceUsername} followed ${targetUsername}`,
                            sourceUser: {
                                _id: sourceResult._id,
                                username: sourceResult.username,
                                self: `http://localhost:3000/users/${sourceUsername}`
                            },
                            targetUser: {
                                _id: targetResult._id,
                                username: targetResult.username,
                                self: `http://localhost:3000/users/${targetUsername}`
                            }
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

    const sourceUsername = req.username;
    const targetUsername = req.body.targetUsername;

    const sourceUserId = await globalFunctions.usernameToUserId(sourceUsername);
    const targetUserId = await globalFunctions.usernameToUserId(targetUsername);

    if (targetUserId) {
        //updating the 'following' of the source user

        await User.findOneAndUpdate(
            { username: `${sourceUsername}` },
            { $pull: { following: {
                userId: targetUserId,
                username: targetUsername,
                self: `http://localhost:3000/users/${targetUsername}`
            }} },
            { new: true})
            .then(async sourceResult => {
                await User.findOneAndUpdate(
                    { username: `${targetUsername}` },
                    { $pull: { followers: {
                        userId: sourceUserId,
                        username: sourceUsername,
                        self: `http://localhost:3000/users/${sourceUsername}`
                    } } },
                    { new: true})
                    .then(targetResult => {
                        console.log(`${sourceUsername} unfollowed ${targetUsername} successfully`);
                        res.status(201).json({
                            success: true,
                            message: `${sourceUsername} unfollowed ${targetUsername}`,
                            sourceUser: {
                                _id: sourceResult._id,
                                username: sourceResult.username,
                                self: `http://localhost:3000/users/${sourceUsername}`
                            },
                            targetUser: {
                                _id: targetResult._id,
                                username: targetResult.username,
                                self: `http://localhost:3000/users/${targetUsername}`
                            }
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

const getFollowing = async (req, res) => {
    //response should return list of all followings for user: username
    //accessible by req.username

    const uname = req.username;
    User.findOne({ username: `${uname}` })
    .select('_id username following')
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: `${uname}'s following list`,
            _id: result._id,
            username: result.username,
            following: {
                num_users_followed: result.following.length,
                following_list: result.following
            },
            self: `http://localhost:3000/users/${result.username}/following`
        });
    })
    .catch(err => {
        console.log("Error occured in getFollowing()");
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    });
}

const getFollowers = async (req, res) => {
    const uname = req.username;
    User.findOne({ username: `${uname}` })
    .select('_id username followers')
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: `${uname}'s followers list`,
            _id: result._id,
            username: result.username,
            followers: {
                num_followers: result.followers.length,
                follower_list: result.followers
            },
            self: `http://localhost:3000/users/${result.username}/followers`
        });
    })
    .catch(err => {
        console.log("Error occured in getFollowing()");
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    });
}

module.exports = {
    followUser,
    unfollowUser,
    getFollowing,
    getFollowers
}