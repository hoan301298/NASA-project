const { query } = require('express');
const { 
    getAllLaunches, 
    scheduleNewLaunch, 
    existingLaunchWithFlightNumber, 
    abortLaunchFlightNumber 
} = require('../../models/launches.model');

const { getPagination } = require ('../../service/query');

async function httpGetAllLaunches (req, res) {
    console.log(req.query);
    const { skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;
    console.log(launch);
    if  (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target
    ) {
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }
    const launchDate = new Date(launch.launchDate);
    console.log(
        `
        ${launchDate}
        ${isNaN(launchDate)}
        ${launch.launchDate}
        ${isNaN(launch.launchDate)}
        `
    );
    if (isNaN(launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    };

    launch.launchDate = new Date(launch.launchDate);
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch (req, res) {
    const launchId = Number(req.params.id);
    const existsLaunch = await existingLaunchWithFlightNumber(launchId);
    if(!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found',
        })
    }
    
    const aborted = await abortLaunchFlightNumber(launchId);
    if(!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }

    return res.status(200).json({
        ok: true
    })
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}