const paymentModel = require('../models/depositModel');
const userModel = require('../models/userModel');
const cloudinary = require('../database/cloudinary');
const { paymentNotificationTemplate } = require('../utils/mailTemplates');
const { sendEmail } = require('../utils/sendMail');
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

exports.payment = async (req, res) => {
    try {
        // Extract the user's ID from req.user
        const { userId } = req.user;

        // Extract the required fields from the body data
        const { amount } = req.body;

        // Extract the file from the request
        const file = req.file;

        // Make sure a proof of payment is provided
        if (!file) {
            return res.status(404).json({
                message: "Please upload a proof of payment"
            });
        }

        // Find the user by ID
        const user = await userModel.findById(userId);

        // Check if the user is found
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Upload the file to cloudinary
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });

        // Create the payment data and store it in the database
        const newPayment = await paymentModel.create({
            user: userId,
            userEmail: user.email,
            amount,
            proofOfPayment: result.secure_url,
            filePublicId: result.public_id,
            date: formattedDate
        });

        // Assign the payment's Id to the uniqueId field
        newPayment.paymentId = newPayment._id.toString();
        // Send the payment ID into the user's deposit array
        user.deposits.push(newPayment._id);
        // Save the user data so the deposits array will reflect the payment ID
        await user.save();
        await newPayment.save();

        // The link for cancellation and confirmation of payment
        const cancel = `${req.protocol}://${req.get('host')}/api/decline-deposit/${newPayment._id}`;
        const confirmation = `${req.protocol}://${req.get('host')}/api/confirm-deposit/${newPayment._id}`;

        // Send a notification mail to the admin using the mail template containing the confirmation and cancellation link
        const adminEmail = {
            email: process.env.MAIL_ID,
            subject: "New Deposit",
            html: paymentNotificationTemplate(newPayment, user.fullName, cancel, confirmation),
        };

        await sendEmail(adminEmail);

        // Send a success response to the user
        res.status(200).json({
            message: 'Proof of payment successfully uploaded, pending confirmation',
            data: newPayment
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all payments by an Admin
exports.allPayments = async (req, res) => {
    try {
        // Get all the payments from the database
        const payments = await paymentModel.find().sort({ createdAt: -1 })
        // Check if it is currently empty
        if (payments.length === 0) {
            return res.status(200).json({
                message: 'No payment found in the database'
            })
        }
        // Send a success response
        res.status(200).json({
            message: `Total payments in the database is (${payments.length}) `,
            deposits: payments
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}


// Confirm payment for Admin
exports.confirmPayment = async (req, res) => {
    try {
        // Extract the payment ID from the params
        const { id } = req.params;
        // Find the payment by the ID
        const payment = await paymentModel.findById(id);
        // Check if payment is found or not
        if (!payment) {
            return res.status(400).json({
                message: 'Payment info not found'
            })
        };
        // Check if the payment info has been updated before now
        if (payment.info === "Completed" || payment.info === "Failed") {
            return res.status(400).json({
                message: `Payment info has already been updated to ${payment.info}`
            })
        };

        // Get the user the payment belongs to by getting the ID from within the payment
        const userId = payment.user;
        const user = await userModel.findById(userId);
        // Check if the user is still existing
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Update the info to completed and the user balance based on the payment made
        payment.info = "Completed";
        payment.status = true;
        const Amount = user.balance + payment.amount;
        user.balance = Amount;

        // Save the changes made for both the user and the payment document to the database
        await payment.save();
        await user.save();

        // Send a success response to the user
        res.status(200).json({
            message: 'Payment Completed successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// Decline payment for Admin
exports.declinePayment = async (req, res) => {
    try {
        // Extract the payment ID from the params
        const { id } = req.params;
        // Find the payment by the ID
        const payment = await paymentModel.findById(id);
        // Check if payment is found or not
        if (!payment) {
            return res.status(400).json({
                message: 'Payment info not found'
            })
        };
        // Check if the payment info has been updated before now
        if (payment.info === "Completed" || payment.info === "Failed") {
            return res.status(400).json({
                message: `Payment info has already been updated to ${payment.info}`
            })
        };

        // Update the payment info to read Failed
        payment.info = 'Failed'

        // Save the changes made to the payment document 
        await payment.save();

        // Send a success response to the user
        res.status(200).json({
            message: 'Payment successfully declined'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Get all payments by a User
exports.allUserPayment = async (req, res) => {
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
        // Get all payments in the database belonging to the particular user
        const payments = await paymentModel.find({ _id: { $in: user.deposits } }).sort({ createdAt: -1 })
        // Send a success response
        res.status(200).json({
            message: 'All user\'s payments',
            deposit: payments
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
