var twilio = require('twilio');
var async = require('async');

var resp = new twilio.TwimlResponse();
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID

var alarmPhone = [
	process.env.PHONE_K
]

module.exports = exports = phone = function () {

}

phone.prototype.alarm = function () {
	//require the Twilio module and create a REST client 
	var client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN); 
	 
	async.each(alarmPhone, function (phone) {
	
		client.calls.create({ 
			to: phone, 
			from: "+14086578456", 
			url: "http://arm.axcoto.com:8235/call",  
			method: "GET",  
			fallbackMethod: "GET",  
			statusCallbackMethod: "GET",    
			record: "false" 
		}, function(err, call) { 
			console.log(call.sid); 
		});
	})

}

phone.prototype.callHome = function (reply, options) {
	//resp.say("Thief detecting. Press * to acknowledge, then hand up and call 911")
	resp.play("http://arm.axcoto.com:8235/res/cotrom.mp3")
			.gather({
				action:'http://arm.axcoto.com:8235/acknowledge',
				finishOnKey:'*'
			}, function(node) { //note the use of the "node" variable in the anonymous function
        	//Now you can use this reference as well, if using "this" wrankles you
        	node.say('Press * to acknoledge. Then hang up and call 911')
    	})
	reply(resp.toString())
}

