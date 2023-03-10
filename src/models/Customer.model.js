const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema(
    {
        image_url: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            require: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Ivalid email address'],
        },
        address: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Customer', Customer);
