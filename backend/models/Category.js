const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    parent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Category', categorySchema);