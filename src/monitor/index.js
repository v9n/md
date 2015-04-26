/**
 * Grab an image every 200ms, compare with previous image.
 * It then return an promise  
 *
 */
var Promise = require('bluebird')
var endpoint = {
	miso : '192.168.1.117',
	sushi: '192.168.1.121'
}
var IMAGE_PATH = "/image.jpg"

module.exports = exports = monitor = function () {
}

/**
 * @options object
 * @cb callback
 */
monitor.prototype.start = function (options, cb) {
	options.interval = 800
	this.onDetect = cb
	
	setInterval(this.monitor.bind(this), options.interval, endpoint.miso)
	setInterval(this.monitor.bind(this), options.interval, endpoint.sushi)
}

monitor.prototype.monitor = function (endpoint) {
	console.log("Monitoring " + endpoint + " run at " + new Date().getTime())
}
