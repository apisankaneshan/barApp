const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                //Check if the phone number has exactly 10 digits
                return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid 10-digit phone number`
        }
    },
    school: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ["BASIC", "MANAGER", "ADMIN"],
        default: "BASIC",
        required: true
    },
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'FollowRelation'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'FollowRelation'}]
});

module.exports = mongoose.model('users', userSchema);