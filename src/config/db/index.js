const mongoose = require('mongoose');
require('dotenv').config();

//fixnWarning: Mongoose: the strictQuery
mongoose.set('strictQuery', true);

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB CONNECT SUCCESSFULLY!');
    } catch (error) {
        console.log('DB CONNECT FAILUE \n' + error);
    }
}

module.exports = { connect };
