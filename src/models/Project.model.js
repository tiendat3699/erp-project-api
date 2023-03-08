const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STATUS = {
    PROGRESSING: 'Progressing',
    DONE: 'Done',
    CANCEL: 'Cancel',
};

const Project = new Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        customerId: {
            type: Schema.ObjectId,
            ref: 'Customer',
            require: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            trim: true,
            default: STATUS.PROGRESSING,
        },
        start_date: {
            type: Date,
            default: Date.now,
        },
        end_date: {
            type: Date,
            default: Date.now,
        },
        users: [
            {
                type: Schema.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Project', Project);
module.exports.STATUS = STATUS;
