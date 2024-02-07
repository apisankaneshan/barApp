const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const followController = require("../../controllers/userControllers/followController");

//Get all following
router.get('/', followController.getFollowing);

//Follow a user
router.post('/', followController.followUser);

//Unfollow a user
router.delete('/', followController.unfollowUser);

module.exports = router;