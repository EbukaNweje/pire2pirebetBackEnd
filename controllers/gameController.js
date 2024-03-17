const userModel = require('../models/userModel');
const gameModel = require('../models/gameModel');


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