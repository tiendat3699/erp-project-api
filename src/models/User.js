const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
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
            match: [/^[a-z0-9_-]*$/, 'Invalid user name'],
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Ivalid email address'],
        },
        password: {
            type: String,
            minLength: 8,
            require: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
