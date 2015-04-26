var twilio = require('twilio');
var resp = new twilio.TwimlResponse();

module.exports = exports = phone = function () {

	
}


phone.prototype.callHome = function (reply, options) {
	resp.say("Welcome to Ruby's home")
		.gather("")
	reply(resp.toString())
}


