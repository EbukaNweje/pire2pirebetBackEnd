const express = require('express');
const { createPostGame, getPostGameById, updatePostGame, deletePostGame, getAllPostGame } = require('../controllers/postGameController');
const router = express.Router();



router.post('/postgame', createPostGame)
router.get('/getallpostedgames', getAllPostGame )
router.get('/getpostedgamebyid/:postgameId', getPostGameById)
router.put('/updatepostedgame/:postgameId', updatePostGame)
router.delete('/deletepostedgame/:postgameId', deletePostGame)

module.exports = router;