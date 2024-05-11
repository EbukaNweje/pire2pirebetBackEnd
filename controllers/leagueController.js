const League = require('../models/leagueModel');
const Country = require('../models/countryModel');

exports.createLeague = async (req, res) => {
    try {
        const { leagueName, countryId } = req.body;

        // Check if the country exists
        const country = await Country.findById(countryId);
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }

        // Create the league
        const newLeague = new League({ leagueName, country: countryId });
        const savedLeague = await newLeague.save();

        // Push the league to the country's leagues array
        country.leagues.push(savedLeague);
        await country.save();

        res.status(200).json({
            message: 'League created successfully',
            data: savedLeague
        });
    } catch (error) {
        console.error("Error creating league:", error);
        res.status(500).json({
            message: error.message
        });
    }
};



const axios = require('axios');

const API_KEY = process.env.YOUR_API_KEY;

// Function to fetch data about all football competitions (leagues)
exports.getAllFootballLeagues  = async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v2/competitions', {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });
        const competitions = response.data.competitions;

        const leagueNames = competitions.map(competition => competition.name);
        leagueNames.sort((a, b) => a.localeCompare(b));

        if(!leagueNames){
            return res.status(404).json({
                message : `Not found`
            })
        }

        res.status(200).json({
            message: `Leagues found`,
            data: leagueNames
        })
    
    } catch (error) {
        console.error("Error fetching football competitions:", error);
        throw error;
    }
};

// Read Operation - Get all leagues
exports.getAllLeagues = async (req, res) => {
    try {
        const leagues = await League.find().populate('country');
        res.status(200).json({
            message: 'All leagues retrieved successfully',
            data: leagues
        });
    } catch (error) {
        console.error("Error getting leagues:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Read Operation - Get league by ID
exports.getLeagueById = async (req, res) => {
    const { leagueId } = req.params;
    try {
        const league = await League.findById(leagueId).populate('country');
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        res.status(200).json({
            message: 'League retrieved successfully',
            data: league
        });
    } catch (error) {
        console.error("Error getting league:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Operation
exports.updateLeague = async (req, res) => {
    const { leagueId } = req.params;
    const newData = req.body;
    try {
        const updatedLeague = await League.findByIdAndUpdate(leagueId, newData, { new: true });
        if (!updatedLeague) {
            return res.status(404).json({ message: 'League not found' });
        }
        res.status(200).json({
            message: 'League updated successfully',
            data: updatedLeague
        });
    } catch (error) {
        console.error("Error updating league:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Operation
exports.deleteLeague = async (req, res) => {
    const { leagueId } = req.params;
    try {
        const deletedLeague = await League.findByIdAndDelete(leagueId);
        if (!deletedLeague) {
            return res.status(404).json({ message: 'League not found' });
        }
        res.status(200).json({
            message: 'League deleted successfully',
            data: deletedLeague
        });
    } catch (error) {
        console.error("Error deleting league:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

