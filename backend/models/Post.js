const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    url: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    Comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],

    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    image: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model('Post', postSchema);