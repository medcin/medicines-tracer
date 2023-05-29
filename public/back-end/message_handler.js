/*
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);
*/
/*

import dotenv from 'dotenv';
import twilio from 'twilio';
import crypto from 'crypto';
*/
/*
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mynumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);

let mesg = "hello maha";
let toNumber = "+966543155333";
const message = client.messages.create({
    body: mesg,
    from: mynumber,
    to: toNumber,
    
})
.then(message=> console.log(message.sid))
.catch(error => console.log(error));
console.log("message sent");*/
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mynumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);
/*
let mesg = "hello maha";

let toNumber = "+966543155333";
const message = client.messages.create(
    {
        body: mesg,
        from: mynumber,
        to: toNumber,
    })
.then(message=> console.log(message.sid))
.catch(error => console.log(error));
console.log("message sent");

*/
/*
class Message_handler{
    /*
    constructor(phone, message){
        this._phone = phone;
        this._message = message;
    }
    set setPhone(phone){
        this._phone = phone;
    }
    set setMessage(message){
        this._message = message;
    }
    get getPhone(){
        return this._phone;
    }
    get getMessage(){ 
        return this._message;   
    }
    sendMessage(){
        return this._sendMessage(this._phone, this._message);
    }
    
    _sendMessage(to, msg){
        // need configration about the typeof messag and toNumber

        const message = client.messages.create({
            body: msg,
            from: mynumber,
            to: to,
            
        })
        .then(msg=> console.log(msg.sid))
        .catch(error => console.log(error));
        console.log("message sent");

    }
}


let user = new Message_handler("+966543155333", "test");
*/
/*

class OTP{
constructor (phoneNumber){
    this._phoneNumber = phoneNumber;
}
set setPhoneNumber(phoneNumber){
    this._phoneNumber = phoneNumber;   
}
let o_clinet = client;

o_clinet.verify.services.create({friendlyName: 'My Verify Service'})
.then(service => {
    console.log(service.sid); // Output: the Verify service ID

    // Send an OTP via SMS
    return o_clinet.verify.services(service.sid)
    .verifications
    .create({to: this._phoneNumber, channel: 'sms'});
    })
    .then(verification => {
    console.log(verification.status); // Output: "pending"
    console.log(verification.sid); // Output: the verification ID
})
.catch(error => {
    console.log(error);
});

}
*/

//let otp = new OTP("+966543155333"); 


/*
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mynumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);

class Message_handler{
    constructor(phone, message){
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const mynumber = process.env.MY_NUMBER;
    }

    sendMessage(toNumber, messageh){
        // need configration about the typeof messag and toNumber

        const message = client.messages.create({
            body: mesg,
            from: mynumber,
            to: toNumber,
            
        })
        .then(message=> console.log(message.sid))
        .catch(error => console.log(error));
        console.log("message sent");

    }

    const messaget = new Message_handler();
    messaget.sendMessage("+966543155333", "hello abdulrahman");

    
/*

Object.defineProperty(window, 'sendMessage', {
    value: function(phone, message) {
      // function body
    },
    writable: false, // make the function read-only
    configurable: false // prevent the function from being deleted
});*/


class OTP {
    constructor(phoneNumber) {
        this._phoneNumber = phoneNumber;
        this._client = require('twilio')(accountSid, authToken);
    }

    set setPhoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
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
const otp = new OTP('+966543155333');
otp.sendOTP();