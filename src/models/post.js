const mongoose = require('mongoose');

//schema for the structure of the database.
const postSchema = new mongoose.Schema({
    name: {type: String, required: true},
    caption: {type: String, required: true}
},
//for current date..
{timestamps: true} 
);

module.exports = mongoose.model('post', postSchema);