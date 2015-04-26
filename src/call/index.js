var twilio = require('twilio');
var resp = new twilio.TwimlResponse();

module.exports = exports = phone = function () {

	
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

