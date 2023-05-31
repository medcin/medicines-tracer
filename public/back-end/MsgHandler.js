
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mynumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);
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

const msgHandelr = new MsgHandler();
msgHandelr.sendMsg("hello", "+966543155333");
