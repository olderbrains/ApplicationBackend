const admin = require('../config/firebaseService');
const msg91 = require('../config/msg91');

exports.sendOTP = async (countryCode, phoneNumber) => {
    await msg91.sendOTP(countryCode, phoneNumber);
};

exports.verifyOTPAndGenerateToken = async (countryCode, phone, otp) => {
    const result = await msg91.verifyOTP(countryCode, phone, otp);

    if (result?.message !== 'OTP verified success' && result?.message !== 'Mobile no. already verified') {
        return ;
    }
    const existingUser = await admin.auth().getUserByPhoneNumber(countryCode+phone).catch(() => null);

    if (existingUser) {
        return await admin.auth().createCustomToken(existingUser.uid);
    }

    const userRecord = await admin.auth().createUser({ phoneNumber: countryCode+phone }).catch(err => {
        if (err.code === 'auth/phone-number-already-exists') {
            return admin.auth().getUserByPhoneNumber(countryCode+phone);
        }
        throw err;
    });

    return await admin.auth().createCustomToken(userRecord.uid);
};