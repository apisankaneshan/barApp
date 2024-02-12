const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const checkAuth = require("./src/middleware/check-authorization");
const userRoutes = require("./src/routes/userRoutes/users"); //defines path to user.js file in routes/userRoutes
const signupRoutes = require("./src/routes/entryRoutes/signup");
const loginRoutes = require("./src/routes/entryRoutes/login");

mongoose.connect("mongodb+srv://ericmuzzo:" + process.env.MONGO_ATLAS_PW + "@node-rest-shop.wnwjwnx.mongodb.net/");
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//app.use('/users', checkAuth.checkAdminAuth, userRoutes); //defining endpoint of url
app.use('/users', userRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;