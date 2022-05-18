const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'User', //Reference model
        required: [true, "userId field cannot be empty"],
    },
    title: {
        type: String,
        required: [true, "title field cannot be empty"],
        maxlength: [100, "title can be of maximum 100 characters"]
    },
    description: {
        type: String,
        maxlength: [1000, "description can be of maximum 1000 characters"],
    },
    comments: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    unlikes: {
        type: Array,
        default: []
    }
},
    { timestamps: true });

var post = new mongoose.model('Post', PostSchema);
module.exports = post;