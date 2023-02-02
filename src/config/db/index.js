const mongoose = require('mongoose');
require('dotenv').config();

function connect() {
    mongoose
        .connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('DB CONNECT SUCCESSFULLY!');
        })
        .catch((error) => {
            console.log('DB CONNECT FAILUE \n' + error);
        });
}

module.exports = { connect };
