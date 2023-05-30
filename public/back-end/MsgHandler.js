
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mynumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);
const fs = require('fs');

function fetchJson(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return callback(err);
        }
        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (parseErr) {
            console.error(`Error parsing JSON data from file ${filePath}:`, parseErr);
            callback(parseErr);
        }
    });
}
class MsgHandler {
    constructor() {
        this._accountSid = process.env.TWILIO_ACCOUNT_SID;
        this._authToken = process.env.TWILIO_AUTH_TOKEN;
        this._mynumber = process.env.MY_NUMBER;
        this._client = require('twilio')(this._accountSid, this._authToken);

        // Make sendMsg read-only
        Object.defineProperty(this, 'sendMsg', {
            value: this._sendMsg.bind(this),
            writable: false,
            configurable: false
        });
    }

    // Private method to send messages
    _sendMsg(mesg, toNumber) {
        const message = this._client.messages.create({
            body: mesg,
            from: this._mynumber,
            to: toNumber,
        })
            .then(message => console.log(message.sid))
            .catch(error => console.log(error));
        console.log("message sent");
    }
}




const filePath = 'tDB.json';

fetchJson(filePath, (err, data) => {
    if (err) {
        console.error('Error fetching data:', err);
        return;
    }
    console.log('Data fetched:', data);
});

//const msgHandelr = new MsgHandler();
//msgHandelr.sendMsg("hello", "+966543155333");
