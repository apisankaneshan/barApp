const mongoose = require('mongoose');

const userSchema = mongoose.userSchema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        Type: String,
        required: true
    },
    email: {
        Type: String,
        required: true
    },
    username: {
        Type: String,
        required: true
    },
    password: {
        Type: String,
        required: true
    },
    phone_number: {
        Type: Number,
        min: 10,
        max: 10,
        required: true
    },
    school: {
        Type: String,
        required: false
    }

});

module.exports = mongoose.model('users', userSchema);