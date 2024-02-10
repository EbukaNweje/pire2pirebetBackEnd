const withdrawModel = require('../models/withdrawModel');
const userModel = require('../models/userModel');

// Make withdraw
exports.withdraw = async (req, res) => {
    try {
        // Extract the user's ID from the req.user
        const { userId } = req.user;
        // Extract the required fields from the body data
        const { amount } = req.body;

        // Find the user by the ID
        const user = await userModel.findById(userId);
        // Check if the user is found
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (user.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const currentDate = new Date();

        // Create the withdraw data and store it in the database
        const newWithdraw = await withdrawModel.create({
            user: userId,
            address: user.bitcoinAddress,
            amount,  
            date: currentDate.toLocaleString()
        });

        // Temporarily assign the withdraw's Id to the uniqueId field
        // newWithdraw.uniqueId = newWithdraw._id.toString();
        // Send the withdraw ID into the user's withdraw array and into the transaction history document
        user.withdraws.push(newWithdraw._id);

        // Deduct the amount from the user's balance
        const Balance = user.balance - amount;
        user.balance = Balance;
        // Save the user data and the transaction so the withdraws array will reflect the withdraw ID
        await user.save()
        await newWithdraw.save()

        // The link for cancelation and confirmation of withdraw
        const cancel = `${req.protocol}://${req.get('host')}/api/v1/user/withdraw-decline/${newWithdraw._id}`
        const confirmation = `${req.protocol}://${req.get('host')}/api/v1/user/withdraw-confirm/${newWithdraw._id}`

        // Send a notification mail to the admin using the mail template containing the confirmation and cancelation link
        // const adminEmail = {
        //     email: process.env.MAIL_ID,
        //     subject: "New Withdraw",
        //     html: withdrawNotificationTemplate(newWithdraw, user.email, cancel, confirmation),
        // };

        // await sendEmail(adminEmail)


        // Send a success response to the user
        res.status(200).json({
            message: 'Withdrawal successful, pending confirmation',
            data: newWithdraw
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Confirm withdraw for Admin
exports.confirmWithdraw = async (req, res) => {
    try {
        // Extract the withdraw ID from the params
        const { id } = req.params;
        // Find the withdraw by the ID
        const withdraw = await withdrawModel.findById(id);
        // Check if withdraw is found or not
        if (!withdraw) {
            return res.status(400).json({
                message: 'Withdraw info not found'
            })
        };
        // Check if the withdraw info has been updated before now
        if (withdraw.info === "Completed" || withdraw.info === "Failed") {
            return res.status(400).json({
                message: `Withdraw info has already been updated to ${withdraw.info}`
            })
        };

        // Get the user the withdraw belongs to by getting the ID from within the withdraw
        const userId = withdraw.user;
        const user = await userModel.findById(userId);
        // Check if the user is still existing
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Update the info to completed and the user balance based on the withdraw made
        withdraw.info = "Completed";
        withdraw.status = true;

        // Save the changes made for both the user and the withdraw document to the database
        await withdraw.save();

        // Send a success response to the user
        res.status(200).json({
            message: 'Withdraw Confirmed successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// Decline withdraw for Admin
exports.declineWithdraw = async (req, res) => {
    try {
        // Extract the withdraw ID from the params
        const { id } = req.params;
        // Find the withdraw by the ID
        const withdraw = await withdrawModel.findById(id);
        // Check if withdraw is found or not
        if (!withdraw) {
            return res.status(400).json({
                message: 'Withdraw info not found'
            })
        };
        // Check if the withdraw info has been updated before now
        if (withdraw.info === "Completed" || withdraw.info === "Failed") {
            return res.status(400).json({
                message: `Withdraw info has already been updated to ${withdraw.info}`
            })
        };

        // Update the withdraw info to read Failed
        withdraw.info = 'Failed'
        // Get the user the withdraw belongs to by getting the ID from within the withdraw
        const userId = withdraw.user;
        const user = await userModel.findById(userId);
        // Check if the user is still existing
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const Balance = user.balance + withdraw.amount;
        user.balance = Balance;

        // Save the changes made to the withdraw document 
        await withdraw.save();
        await user.save();

        // Send a success response to the user
        res.status(200).json({
            message: 'Withdraw successfully declined'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Get all payments by a User
exports.allUserWithrawal = async (req, res) => {
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
        // Get all withdraws in the database belonging to the particular user
        const withdraws = await withdrawModel.find({ _id: { $in: user.withdraws } }).sort({ createdAt: -1 })
        // Send a success response
        res.status(200).json({
            message: 'All user\'s withdrawals',
            withdrawal: withdraws
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
