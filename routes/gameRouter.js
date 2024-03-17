const express = require('express');
const { bookGame, makeOffer, allGames } = require('../controllers/gameController');
const { authenticate } = require('../utils/authentication');
const router = express.Router();

router.post('/stake', authenticate, bookGame);
router.post('/offer/:id', authenticate, makeOffer);
router.get('/allgames', allGames);

module.exports = router;