const express = require('express');
const { payment, allPayments, confirmPayment, declinePayment, allUserPayment } = require('../controllers/depositController');
const { authenticate, isAdmin } = require('../utils/authentication');
const { withdraw, confirmWithdraw, declineWithdraw, allUserWithdrawal } = require('../controllers/withdrawController');
const upload = require('../utils/multer');
const { allUserTransaction } = require('../models/transaction');

const router = express.Router();

router.post('/deposit', upload.single('proofOfPayment'),authenticate, payment);

router.get('/all-deposits', authenticate, isAdmin, allPayments);

router.get('/all-user-deposits', authenticate, allUserPayment );

router.post('/confirm-deposit/:id', authenticate, isAdmin, confirmPayment);

router.get('/decline-deposit/:id', authenticate, isAdmin, declinePayment);

router.post('/withdraw-confirm/:id', authenticate, isAdmin, confirmWithdraw);

router.post('/withdraw-decline/:id', authenticate, isAdmin, declineWithdraw);

router.get('/transactions', authenticate, allUserTransaction);

router.post('/withdraw', authenticate, withdraw);

router.get('/all-user-withdrawals', authenticate, allUserWithdrawal );

module.exports = router