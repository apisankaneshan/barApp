const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const followController = require("../../controllers/userControllers/followController");

//Get all followers
router.get('/', followController.getFollowers);

//Remove a follwer
router.delete('/', followController.unfollowUser);  //maybe we can use unfollow to perform both 'unfollow'
                                                    //action and remove a follower action