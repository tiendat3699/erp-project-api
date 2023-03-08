const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STATUS = {
    PROGRESSING: 'Progressing',
    DONE: 'Done',
    CANCEL: 'Cancel',
};

const Project = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    customerId: {
        type: String,
        require: true,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
        require: true,
        default: STATUS.PROGRESSING,
    },
    users: {
        type: Array,
        require: true,
    },
});

module.exports = mongoose.model('Project', Project);
