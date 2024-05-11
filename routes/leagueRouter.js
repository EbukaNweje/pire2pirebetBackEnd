const express = require('express');
const router = express.Router();

const { createLeague, getAllLeagues, getLeagueById, updateLeague, deleteLeague, getAllFootballLeagues } = require('../controllers/leagueController');

router.post('/createleague', createLeague)
router.get('/allleagues', getAllLeagues)
router.get('/allfootballleagues', getAllFootballLeagues)
router.get('/oneleague/:leagueId', getLeagueById)
router.put('/updateleague/:leagueId', updateLeague)
router.delete('/deleteleague/:leagueId', deleteLeague)

module.exports = router;