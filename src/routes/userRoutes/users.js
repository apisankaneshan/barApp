const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userController = require("../../controllers/userControllers/userController");

/*Create user
router.post('/signup', userController.createNewUser);
*/

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