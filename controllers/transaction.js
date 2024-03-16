const userModel = require('../models/userModel');
const Deposit = require('../models/depositModel'); 
const Withdrawal = require('../models/withdrawModel');

// Get all transactions by a User
exports.allUserTransaction = async (req, res) => {
    try {
        const { userId } = req.user;
        // Get the user's data
        const user = await userModel.findById(userId);
        // Check if the user is still existing
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const deposits = await Deposit.find({ user: userId }).lean();
        const withdrawals = await Withdrawal.find({ user: userId }).lean();

        const allTransactions = [...deposits, ...withdrawals, ];

        // Sorting transactions by createdAt in descending order
        allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Send a success response
        res.status(200).json({
            message: `All user\'s transactions`,
            data: allTransactions
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
