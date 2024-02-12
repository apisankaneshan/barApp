const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../../models/user");

const createNewUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err){
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                phone_number: req.body.phone_number,
                school: req.body.school,
                role: req.body.role
            });
            user.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "User created successfully",
                    request: {
                        type: "POST",
                    },
                    createdUser: {
                        _id: result._id,
                        first_name: result.first_name,
                        last_name: result.last_name,
                        username: result.username,
                        password: hash,
                        email: result.email,
                        phone_number: result.phone_number,
                        school: result.school,
                        role: result.role
                    }
                });
            })
            .catch(err => {
                if (err.code == 11000){                 //Corresponds to a duplicate key error
                    const duplicateKey = Object.keys(err.keyValue)[0];
                    const duplicateValue = err.keyValue[duplicateKey];
                    
                    console.log(`The ${duplicateKey} provided already exists: ${duplicateValue}`);
                    console.log(err);
                    res.status(409).json({
                        error: "A specified property already exists in the database",
                        propertyName: duplicateKey,
                        invalidPropertyValue: duplicateValue
                        });
                } else if (err.name == 'ValidationError'){      //Catches invalid phone# length
                    console.log('Phone number is not 10 digits long');
                    res.status(409).json({
                        result: "User not created",
                        name: err.name,
                        reason: `${req.body.phone_number} is not a valid 10-digit number`,
                        fullErrorMessage: err
                    });
                } else {                                        //Catches any remaining error
                    console.log(err);                           //Leave as 500 for now
                    res.status(500).json({
                        error: err
                    });
                }
            });
        }
    
    });
};

const loginUser = (req, res, next) => {
    User.find({username: req.body.username})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message: "Authorization Failed."
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            console.log(req.body.password + "\n");
            console.log(user[0].password + "\n");
            if(err){
                return res.status(401).json({
                    message: "Authorization Failed."
                });
            }
            if(result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                    role: user[0].role
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: "Authorization Passed.",
                    token: token
                });
            }
            else{
                return res.status(401).json({
                    message: "Authorization Failed."
                });
            }
        });
    })
    .catch();

}

module.exports = {
    createNewUser,
    loginUser
};