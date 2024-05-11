const PostGame = require('../models/postGameModel');

// Create Operation
exports.createPostGame = async (req, res) => {
    try {
        const { country, league, homeTeam, awayTeam, homeOdd, awayOdd, drawOdd, matchDate, matchTime } = req.body;

        // Create a new post game instance
        const newPostGame = new PostGame({
            country,
            league,
            homeTeam,
            awayTeam,
            homeOdd,
            awayOdd,
            drawOdd,
            matchDate,
            matchTime
        });

        // Save the post game to the database
        const savedPostGame = await newPostGame.save();

        res.status(201).json({
            message: 'Post game created successfully',
            data: savedPostGame
        });
    } catch (error) {
        console.error("Error creating post game:", error);
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getAllPostGame = async (req, res) =>{
    try{
        const allPostedGames = await PostGame.find()

        if(!allPostedGames){
            return res.status(404).json({
                message: `No posted games found`,
            })
        }

        res.status(200).json({
            message: `All posted games found`,
            data: allPostedGames
        })

    }catch(error){
        res.status(500).json({
            messgae: `Internal server error: ${error.message}`
        })
    }
}

// Read Operation
exports.getPostGameById = async (req, res) => {
    const { postgameId } = req.params;
    try {
        const postGame = await PostGame.findById(postgameId);
        if (!postGame) {
            return res.status(404).json({ message: 'Post game not found' });
        }
        res.status(200).json({
            message: 'Post game retrieved successfully',
            data: postGame
        });
    } catch (error) {
        console.error("Error getting post game:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Operation
exports.updatePostGame = async (req, res) => {
    const { postgameId } = req.params;
    const newData = req.body;
    try {
        const updatedPostGame = await PostGame.findByIdAndUpdate(postgameId, newData, { new: true });
        if (!updatedPostGame) {
            return res.status(404).json({ message: 'Post game not found' });
        }
        res.status(200).json({
            message: 'Post game updated successfully',
            data: updatedPostGame
        });
    } catch (error) {
        console.error("Error updating post game:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Operation
exports.deletePostGame = async (req, res) => {
    const { postgameId } = req.params;
    try {
        const deletedPostGame = await PostGame.findByIdAndDelete(postgameId);
        if (!deletedPostGame) {
            return res.status(404).json({ message: 'Post game not found' });
        }
        res.status(200).json({
            message: 'Post game deleted successfully',
            data: deletedPostGame
        });
    } catch (error) {
        console.error("Error deleting post game:", error);
        res.status(500).json({
            message: error.message
        });
    }
};
