const User = require("../../models/user");

const followUser = async (req, res) => {
    //response should return list of updated followers for user: username
    //accessible by req.params.username
    //should update follwers array of {username} with username passed in body
    //of request, then do the same for the opposite

    const sourceUsername = req.params.username;
    const targetUsername = req.body.targetUsername;

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