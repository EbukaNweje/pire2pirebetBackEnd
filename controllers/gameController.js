const userModel = require('../models/userModel');
const gameModel = require('../models/gameModel');
const offerModel = require('../models/offerModel');

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
            return res.status(400).json({
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

        // Push the offer into the user's betslip array
        user.betslips.push(bookedGame);
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
        if (game.user.id.toString() === userId) {
            return res.status(400).json({
                message: 'Cannot make an offer against yourself'
            });
        };
        // Multiply the initial stake with the current offer type to get the offer amount
        const amount = game.stake * offerType;
        // Concactinate X to the offer before saving to the database
        const type = 'X' + offerType;
        // Calculate the offer return by adding the offer stake with the initial game stake
        const returns = game.stake + amount;

        // Check if the user's balance is enough for the stake
        if (user.balance < amount) {
            return res.status(400).json({
                message: 'Insufficient balance'
            });
        };

        // Construct the offer object
        const offer = await offerModel.create({
            gameId: gameId,
            game: game.game,
            pick: game.pick,
            offerType: type,
            offerAmount: amount,
            offerReturn: returns,
            offerBy: {
                id: userId,
                name: user.fullName
            }
        })

        const balance = user.balance - amount;
        user.balance = balance

        // await game.save();
        await user.save()

        res.status(200).json({
            message: 'Offer made successfully',
            offer
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Get all games
exports.allGames = async (req, res) => {
    try {
        const games = await gameModel.find().sort({ updatedAt: -1 });

        res.status(200).json({
            message: 'All Games available',
            data: games
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Get all Offers
exports.allOffers = async (req, res) => {
    try {
        const { userId } = req.user;

        // Get all games posted by user
        const games = await gameModel.find({ 'user.id': userId }).sort({createdAt: -1});

        // Extracting game IDs from games array
        const gameIds = games.map(game => game._id);

        // Get all offers in the database based on the user
        const offers = await offerModel.find({ $or: [{ 'offerBy.id': userId }, { gameId: { $in: gameIds } }] }).sort({createdAt: -1});

        res.status(200).json({
            message: 'All Offer\'s available',
            data: offers
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


