const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;