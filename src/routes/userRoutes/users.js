const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userController = require("../../controllers/userControllers/userController");
const followersRoute = require("./followers");
const followingRoute = require("./following");

router.use('/:username/followers', function(req, res, next) {   //replace f'n with controller f'n
    req.username = req.params.username;
    next();
}, followersRoute);

router.use('/:username/following', function(req, res, next) {   //replace f'n with controller f'n
    req.username = req.params.username;
    next();
}, followingRoute);

//Get all users
router.get('/', userController.getAllUsers);

//Get user
router.get('/:userId', userController.getUser);

//Delete user
router.delete('/:userId', userController.deleteUser);

//Update user info
router.patch('/:userId', userController.updateUserInfo);

module.exports = router;