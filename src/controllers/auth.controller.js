const authService = require('../services/auth.service');

exports.sendOtp = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing' });
        }

        const { countryCode, phoneNumber } = req.body;  // Destructure here

        if (!countryCode || !phoneNumber) {
            return res.status(400).json({ error: 'countryCode and phoneNumber are required' });
        }

        await authService.sendOTP(countryCode, phoneNumber);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        next(error);
    }
};


exports.verifyOtp = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing' });
        }

        const { countryCode, phoneNumber, otp } = req.body;

        if (!countryCode || !phoneNumber || !otp) {
            return res.status(400).json({
                error: 'countryCode, phoneNumber, and OTP are required'
            });
        }
        // Ensure OTP is a valid string and contains only numeric characters
        if (!/^\d+$/.test(otp)) {
            return res.status(400).json({ error: 'OTP must be a numeric string' });
        }

        const token = await authService.verifyOTPAndGenerateToken(countryCode, phoneNumber, otp);

        if (!token) {
            return res.status(400).json({
                status: false,
                response: 'Invalid or expired OTP' });
        }

        res.status(200).json({status: true,
            response: token });

    } catch (error) {
        next(error);
    }
};
