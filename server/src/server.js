const http = require('http');
const app = require('./app');;
require('dotenv').config();

const { mongoConnect } = require('../src/service/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

const server = http.createServer(app);
const PORT = process.env.PORT;

async function startServer(){
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();
    console.log(module.paths);

    server.listen(PORT, () => {
        console.log(`Server is running on Port ${PORT}...`)
    });
};

startServer();