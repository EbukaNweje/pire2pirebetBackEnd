const userModel = require('../models/userModel');
const gameModel = require('../models/gameModel');

// To book a game
exports.bookGame = async (req, res) => {
    try {
        const { game, pick, stake } = req.body;

        const { userId } = req.user;
        // Get the user's data
        const user = await userModel.findById(userId);
        // Check if the user is still existing
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        };
        // Check if the user's balance is enough for the stake
        if (user.balance < stake) {
            return res.status(404).json({
                message: 'Insufficient balance'
            });
        };

        // Create an instance of the game booked
        const bookedGame = await gameModel.create({
            game,
            pick,
            stake,
            user: {
                id: userId,
                name: user.fullName
            }
        });

        // Deduct the stake amount from the user's balance
        const Balance = user.balance - stake;
        user.balance = Balance;
        // Save the user data to reflect the new balance
        await user.save()

        res.status(200).json({
            message: 'Game successfully booked',
            data: bookedGame
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// To make an offer on a booked game 
exports.makeOffer = async (req, res) => {
    try {
        const gameId = req.params.id;
        const { offerType, offerAmount } = req.body;

        const { userId } = req.user;
        // Get the user's data
        const user = await userModel.findById(userId);
        // Check if the user is still existing
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        };

        // Get the game to make an offer against
        const game = await gameModel.findById(gameId);
        // Check if the game is still existing
        if (!game) {
            return res.status(404).json({
                message: 'Game not found'
            });
        };

        // Check if the user trying to make an offer is the original owner of the stake
        if (game.user.id === userId) {
            return res.status(404).json({
                message: 'Cannot make an offer against yourself'
            });
        };
        
        const amount = game.stake * offerType;

        // Check if the user's balance is enough for the stake
        if (user.balance < amount) {
            return res.status(404).json({
                message: 'Insufficient balance'
            });
        };

        // Construct the offer object
        const data = {
            offerType,
            offerAmount: amount,
            offerStatus: 'Pending',
            offerBy: {
                id: userId,
                name: user.fullName
            }
        }
        console.log(data);
        game.offers.push(data);

        await game.save();

        res.status(200).json({
            message: 'Offer made successfully',
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
