const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    fullname: {
        type: String,
        maxlength: 32,
        require: true,
        trim: true,
    },
    username: {
        type: String,
        minLength: 6,
        maxlength: 32,
        require: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        minLength: 8,
        require: true,
        trim: true,
    },
});

module.exports = mongoose.model('User', User);
