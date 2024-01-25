const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const entryController = require("../../controllers/entryControllers/entryController");

//Create user
router.post('/', entryController.createNewUser);

module.exports = router;
