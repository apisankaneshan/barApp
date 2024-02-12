const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const entryController = require("../../controllers/entryControllers/entryController");

//Login User
router.post('/', entryController.loginUser);

module.exports = router;