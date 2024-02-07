const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    relatedUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true,
        validate: {
            validator: async function(userId){
                const user = await mongoose.model('users').findById(userId);
                return user !== null;
            },
            message: props => `${props.userId} is not a valid user ObjectId`
        }
    }
}, { timestamps: {created_at: "followed_at", updated_at: "updated_at"}});

module.exports = mongoose.model("FollowRelation", followSchema);

//module.exports.FollowRelation = followSchema;