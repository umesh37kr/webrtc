const crypto = require('crypto')
const smsSid = process.env.SMS_SID;
const smsAuthTocken = process.env.SMS_AUTH_TOCKEN;
const twilio = require('twilio')(smsSid, smsAuthTocken, {
    lazyLoading: true
})
const hashService = require('./hash-service')
class OtpService{
    async generateOtp(){
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone, otp){
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `your coderhouse otp is ${otp}.`
        })
    }
    // verifying otp
    verifyOtp(hashedOtp, data){
        const computedHash = hashService.hashOtp(data)
        return hashedOtp === computedHash
    }
}
module.exports = new OtpService()