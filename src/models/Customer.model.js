const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Customer = new Schema(
    {
        avatar: {
            type: Schema.Types.ObjectId,
            ref: 'File',
        },
        avatar_url: {
            type: String,
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

Customer.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

module.exports = mongoose.model('Customer', Customer);
