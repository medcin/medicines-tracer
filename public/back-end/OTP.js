require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mynumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);
class OTP {
    constructor(phoneNumber) {
        this._phoneNumber = phoneNumber;
        this._client = require('twilio')(accountSid, authToken);
    }

    sendOTP() {
        this._client.verify.services.create({friendlyName: 'My medicine-tracer'})
        .then(service => {
          console.log(service.sid); // Output: the Verify service ID

          // Send an OTP via SMS
            return this._client.verify.services(service.sid)
            .verifications
            .create({to: this._phoneNumber, channel: 'sms', from: "medicine-tracer"});
        })
        .then(verification => {
          console.log(verification.status); // Output: "pending"
          console.log(verification.sid); // Output: the verification ID
        })
        .catch(error => {
            console.log(error);
        });
    }
}

  // Example usage:
const otp = new OTP("+966543155333");
otp.sendOTP();