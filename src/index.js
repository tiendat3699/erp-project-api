const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const route = require('./routes');
const db = require('./config/db');
const env = require('dotenv');

const app = express();

//config dotenv
env.config();

//connect to DB
db.connect();

app.use(morgan('combined'));
app.use(
    cors({
        origin: [process.env.BASE_URL_FE, process.env.BASE_URL_BE],
        credentials: true,
    }),
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cookieParser());

//Route init
route(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
