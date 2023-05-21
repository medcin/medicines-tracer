/*
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);
*/

import dotenv from 'dotenv';
import twilio from 'twilio';
import crypto from 'crypto';

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid,authToken);
const mynumber = process.env.MY_NUMBER;


//const client = require('twilio')(accountSid, authToken);
const message = await client.messages.create({
    body: "تجربة عربي",
    from: mynumber,
    to: "+966543155333",
})
.then(message=> console.log(message.sid))
.catch(error => console.log(error));
