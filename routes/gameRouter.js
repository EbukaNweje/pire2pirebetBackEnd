const express = require('express');
const { bookGame, makeOffer } = require('../controllers/gameController');
const { authenticate } = require('../utils/authentication');
const router = express.Router();

router.post('/stake', authenticate, bookGame);
router.post('/offer/:id', authenticate, makeOffer);

module.exports = router;