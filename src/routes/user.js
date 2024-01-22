const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
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
                phone_number: req.body.email,
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
                        first_name: result.first_name,
                        last_name: result.last_name,
                        username: result.username,
                        password: hash,
                        email: result.email,
                        phone_number: result.email,
                        school: result.school
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    
    })
})