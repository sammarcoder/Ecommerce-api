const express = require('express')
const router = express.Router();
const {signUp, login , requestPasswordReset, resetPassword ,sendVerificationEmail, verifyEmail} = require('../controllers/authController')

router.post('/signup',signUp ),
router.post('/login', login),

// router.post('/reset',requestPasswordReset)
router.post('/request-password-reset', requestPasswordReset);
// Reset password
router.post('/reset-password', resetPassword);

// Verification Routes
 router.post('/send-verification-email',sendVerificationEmail)


router.post('/verify-email', verifyEmail)

module.exports = router