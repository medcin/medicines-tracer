require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mynumber = process.env.MY_NUMBER;
const client = require("twilio")(accountSid, authToken);

//Validtion Code For Inputs

var otp = document.forms["form"]["otp"];

var pass_error = document.getElementById("pass_error");

otp.addEventListener("textInput", pass_Verify);

function validated() {
  if (otp.value.length < 6) {
    otp.style.border = "1px solid red";
    pass_error.style.display = "block";
    otp.focus();
    return false;
  }
}

function pass_Verify() {
  if (otp.value.length >= 5) {
    otp.style.border = "1px solid silver";
    pass_error.style.display = "none";
    return true;
  }
}

class OTP {
  constructor(phoneNumber) {
    this._phoneNumber = phoneNumber;
    this._client = require("twilio")(accountSid, authToken);
  }

  sendOTP() {
    this._client.verify.services
      .create({ friendlyName: "My medicine-tracer" })
      .then((service) => {
        console.log(service.sid); // Output: the Verify service ID

        // Send an OTP via SMS
        return this._client.verify
          .services(service.sid)
          .verifications.create({
            to: this._phoneNumber,
            channel: "sms",
            from: "medicine-tracer",
          });
      })
      .then((verification) => {
        console.log(verification.status); // Output: "pending"
        console.log(verification.sid); // Output: the verification ID
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Example usage:
const otp = new OTP("+966543155333");
otp.sendOTP();
