const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true,
        validate: {
            validator: async function(userId){
                const user = await mongoose.model('users').findById(userId);
                return user !== null;
            },
            message: props => `${props.userId} is not a valid user ObjectId`
        }
    },
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true,
        validate: {
            validator: async function(userId){
                const user = await mongoose.model('users').findById(userId);
                return user !== null;
            },
            message: props => `${props.userId} is not a valid user ObjectId`
        }
    },
    isFollowing: {
        type: Boolean,
        default: true
    }
}, { timestamps: true});

followSchema.index({ followerId: 1, followingId: 1 }, { unique: true});

module.exports = mongoose.model('follows', followSchema);