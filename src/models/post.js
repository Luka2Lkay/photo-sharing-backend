const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {type: String, required: true},
    caption: {type: String, required: true},
    image: { type: String, required: true },
});

module.exports = mongoose.model('post', postSchema);