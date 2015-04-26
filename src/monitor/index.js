/**
 * Grab an image every 200ms, compare with previous image.
 * It then return an promise  
 *
 */
var Promise = require('bluebird')

module.exports = exports = monitor = function () {
}

/**
 * @options object
 * @cb callback
 */
monitor.prototype.start = function (options, cb) {
	options.interval = 200
	this.onDetect = cb

	setInterval(this.monitor.bind(this), options.interval)
}

monitor.prototype.monitor = function () {
	console.log("Monitoring run at " + new Date().getTime())
}
