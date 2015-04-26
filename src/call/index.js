var t = require('twilio');
var resp = new twilio.TwimlResponse();

module.exports = exports = phone = function () {

	
}


phone.prototype.call = function (reply, options) {
	resp.say("Welcome to Ruby's home")
	reply(resp.toString())
}


