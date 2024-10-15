const launchesDatabase = require('./launches.mongo');
const planets = require('./planet.mongo');
const axios = require('axios');

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const DEFAULT_FLIGHT_NUMBER = 100;

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function existingLaunchWithFlightNumber (launchFlightNumber) {
    return await findLaunch({
        flightNumber: launchFlightNumber
    });
}

async function getAllLaunches(skip, limit) {
    return await launchesDatabase.find({})
    .skip(skip)
    .limit(limit)
    .sort('flightNumber');
};

async function getLatestFlightNumber() {
    const latestFlightNumber = await launchesDatabase
        .findOne()
        .sort('-flightNumber');
    
    if(!latestFlightNumber) {
        return DEFAULT_FLIGHT_NUMBER;
    }
        
    return latestFlightNumber.flightNumber +1;
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!planet) {
        throw new Error('No matching planet found!')
    }

    const newFlightNumber = await getLatestFlightNumber();
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber
    });
    await saveLaunches(newLaunch);
}

async function saveLaunches(launch) {

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    });
}

async function populateLaunches() {
    console.log('Downloading launch data...');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    });

    if(response.status !== 200) {
        console.log('Problem downloading launch data!');
        throw new Error('Launch data download failed!');
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        console.log(`${launch.flightNumber} ${launch.mission}`);

        await saveLaunches(launch);
    }
}

async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });

    if(firstLaunch) {
        console.log('Launch data already loaded!');
    } else {
        await populateLaunches();
    }
}

async function abortLaunchFlightNumber (launchFlightNumber) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchFlightNumber
    }, {
        upcoming: false,
        success: false
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    loadLaunchesData,
    getAllLaunches,
    scheduleNewLaunch,
    existingLaunchWithFlightNumber,
    abortLaunchFlightNumber
}