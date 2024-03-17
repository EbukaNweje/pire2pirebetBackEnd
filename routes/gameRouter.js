const express = require('express');
const { bookGame } = require('../controllers/gameController');
const { authenticate } = require('../utils/authentication');
const router = express.Router();

router.post('/stake', authenticate, bookGame);

module.exports = router;