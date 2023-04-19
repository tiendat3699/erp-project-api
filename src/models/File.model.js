const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File = new Schema(
    {
        name: String,
        path: String,
        contentType: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('File', File);
