const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../../models/user");
const { ConnectionPoolClosedEvent } = require("mongodb");

const getAllUsers = (req, res, next) => {
    User.find()
    .select('_id username first_name last_name email phone_number school role following followers')
    .exec()
    .then(docs => {
        const response = {
            number_of_users: docs.length,
            users: docs.map(doc => {
                return {
                    _id: doc._id,
                    username: doc.username,
                    first_name: doc.first_name,
                    last_name: doc.last_name,
                    email: doc.email,
                    phone_number: doc.phone_number,
                    school: doc.school,
                    role: doc.role,
                    following: {
                        num_followed: doc.following.length,
                        self: `http://localhost:3000/users/${doc.username}/following`
                    },
                    followers: {
                        num_followers: doc.followers.length,
                        self: `http://localhost:3000/users/${doc.username}/followers`
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + doc.username
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
    const username = req.params.username;
    User.findOne({username: `${username}`})
    .select('_id first_name last_name username school')
    .exec()
    .then(doc => {
        console.log("Retrieved from database", doc);
        if (doc) {  //If the doc (user) exists
            res.status(200).json({
                _id: doc._id,
                username: doc.username,
                first_name: doc.first_name,
                last_name: doc.last_name,
                email: doc.email,
                phone_number: doc.phone_number,
                school: doc.school,
                role: doc.role,
                following: {
                    num_followed: doc.following.length,
                    self: `http://localhost:3000/users/${doc.username}/following`
                },
                followers: {
                    num_followers: doc.followers.length,
                    self: `http://localhost:3000/users/${doc.username}/followers`
                },
                request: {
                    type: 'GET',
                    description: 'Get specific user',
                    url: 'http://localhost:3000/users/' + doc.username
                }
            });
        } else {
            res.status(404).json({message: "No valid user for given username"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

const deleteUser = (req, res, next) => {
    const username = req.params.username;
    User.findOneAndDelete({username: username})
    .exec()
    .then(result => {
        if(result){
            console.log("User Deleted username: " + username);
            console.log("result: " + result);
            res.status(200).json({
                message: "User Deleted"
            });
        }
        else{
            console.log("User does not exist")
            res.status(404).json({
                message: "User does not exist",
                id: id
            });
        }    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

const updateUserInfo = (req, res, next) => {
    const username = req.params.username;
    const updatedProperties = req.body;
    console.log(updatedProperties);
    User.findOneAndUpdate(
        {username: `${username}`}, 
        {$set: updatedProperties},
        {new: true}
    )
    .exec()
    .then(result => {
        
        if(result){
            console.log(`User ${username} updated successfully`);
            console.log("Result: " + result);
            res.status(201).json({
                _id: result._id,
                username: result.username,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
                phone_number: result.phone_number,
                school: result.school,
                role: result.role,
                following: {
                    num_followed: result.following.length,
                    self: `http://localhost:3000/users/${result.username}/following`
                },
                followers: {
                    num_followers: result.followers.length,
                    self: `http://localhost:3000/users/${result.username}/followers`
                }
            });
        }else{
            console.log(`${username} not found`);
            res.status(404).json({
                message: `${username} not found`
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}



module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUserInfo,
};