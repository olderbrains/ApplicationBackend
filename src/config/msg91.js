const axios = require('axios');
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;

exports.sendOTP = async (countryCode, phoneNumber) => {

    const url = `https://control.msg91.com/api/v5/otp?otp_expiry=5&template_id=${TEMPLATE_ID}&mobile=${countryCode}${phoneNumber}&authkey=${MSG91_AUTH_KEY}&realTimeResponse=1`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
     return  null;
    }
};
exports.verifyOTP = async (countryCode, phoneNumber, otp) => {

    const url = `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${countryCode}${phoneNumber}&authkey=${MSG91_AUTH_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
       return  null;
    }
};