const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Apisan_Password_Connect:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop.wnwjwnx.mongodb.net/');
mongoose.Promise = global.Promise;

