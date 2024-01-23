const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require("../models/user");

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
                school: req.body.school
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
                        school: result.school
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

const getAllUsers = (req, res, next) => {
    User.find()
    .select('_id first_name last_name username school')
    .exec()
    .then(docs => {
        const response = {
            number_of_users: docs.length,
            users: docs.map(doc => {
                return {
                    _id: doc._id,
                    first_name: doc.first_name,
                    last_name: doc.last_name,
                    username: doc.username,
                    school: doc.school,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + doc._id
                    }
                }
            })
        };
        console.log(`Retrieved ${docs.length} users`);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

const getUser = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select('_id first_name last_name username school')
    .exec()
    .then(doc => {
        console.log("Retrieved from database", doc);
        if (doc) {  //If the doc (user) exists
            res.status(200).json({
                user: doc,
                request: {
                    type: 'GET',
                    description: 'Get specific user',
                    url: 'http://localhost:3000/users/' + id
                }
            });
        } else {
            res.status(404).json({message: "No valid user for given ID"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

module.exports = {
    createNewUser,
    getAllUsers,
    getUser
};