const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const api = require('./routes/api');
const RENDER_URL = process.env.RENDER_URL;

const allowedOrigins = [
    'http://localhost:3000',
    RENDER_URL,
]

app.use(cors({
    origin: function (origin, callback) {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(morgan('combined'));

app.use(express.json());
app.use('/v1', api);

module.exports = app;