const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLES = {
    ADMIN: 'Admin',
    USER: 'User',
    GUEST: 'Guest',
};

const User = new Schema(
    {
        fullname: {
            type: String,
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
        avatar_url: {
            type: String,
            trim: true,
            default: 'https://avatars.githubusercontent.com/u/96950844?s=40&v=4',
        },
        role: {
            type: String,
            trim: true,
            require: true,
            default: ROLES.GUEST,
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
module.exports.ROLES = ROLES;
