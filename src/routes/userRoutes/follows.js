const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Follow = require('../../models/follow');

router.put('/', (req, res, next) => {
    Follow.findOne({
        'followerId': `${req.body.followerId}`,
        'followingId': `${req.body.followingId}`
    })
    .select('_id followerId followingId isFollowing createdAt updatedAt')
    .exec()
    .then(doc => {
        console.log('Retrieved from db')
        if (doc) {           //relation exists
            console.log(doc);
            Follow.findByIdAndUpdate(doc._id, {"isFollowing" : `${req.body.isFollowing}`})
            .exec()
            .then(updatedRes => {
                console.log(updatedRes);
                res.status(201).json({
                    message: "Res updated successfully",
                    updatedResult: updatedRes
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        } else {
            const followInstance = new Follow({
                _id: new mongoose.Types.ObjectId(),
                followerId: req.body.followerId,
                followingId: req.body.followingId
            });
            followInstance.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    createdRelation: result
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
    .catch(err => {
        console.log("Error occured in last catch");
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;