const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/db');

const app = express();

require('dotenv').config();

//connect to DB
db.connect();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
