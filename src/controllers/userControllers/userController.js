const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../../models/user");
const { ConnectionPoolClosedEvent } = require("mongodb");

const getAllUsers = (req, res, next) => {
    User.find()
    .select('_id first_name last_name username school email role')
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
                    email: doc.email,
                    role: doc.role,
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

const deleteUser = (req, res, next) => {
    const id = req.params.userId;
    User.findByIdAndDelete(id)
    .exec()
    .then(result => {
        if(result){
            console.log("User Deleted id: " + id);
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



module.exports = {
    getAllUsers,
    getUser,
    deleteUser
};