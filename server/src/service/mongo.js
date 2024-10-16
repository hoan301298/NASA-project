const mongoose = require('mongoose');
require('dotenv').config();
const Mongo_URL = process.env.Mongo_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function mongoConnect() {
    await mongoose.connect(Mongo_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}