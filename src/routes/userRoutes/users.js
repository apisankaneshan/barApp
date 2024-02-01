const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userController = require("../../controllers/userControllers/userController");
const followsRoute = require('./follows');

router.use('/follows', followsRoute);

//Get all users
router.get('/', userController.getAllUsers);

//Get user
router.get('/:userId', userController.getUser);

//Delete user
router.delete('/:userId', userController.deleteUser);

/*Login User
router.post('/login', userController.loginUser);
*/

module.exports = router;