const express = require('express');
const { bookGame, makeOffer, allGames, allOffers } = require('../controllers/gameController');
const { authenticate } = require('../utils/authentication');
const router = express.Router();

router.post('/stake', authenticate, bookGame);
router.post('/offer/:id', authenticate, makeOffer);
router.get('/allgames', allGames);
router.get('/alloffers', authenticate, allOffers);

module.exports = router;