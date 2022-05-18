const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'User', //Reference model
    },
    Comment: {
        type: String,
        maxlength: [1000, "comment can be of maximum 1000 characters"]
    }
},
    { timestamps: true }
);

var comment = new mongoose.model('Comment', CommentSchema);
module.exports = comment;