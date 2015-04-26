/**
 * Grab an image every 200ms, compare with previous image.
 * It then return an promise  
 *
 */
var Promise = require('bluebird')
var request = require('request')
var async   = require('async')

var DLINK_USER = process.env.DLINK_USER
var DLINK_PASSWORD = process.env.DLINK_PASSWORD

var endpoint = {
	miso : 'http://' + DLINK_USER + ':' + DLINK_PASSWORD + '@192.168.1.117',
	sushi: 'http://' + DLINK_USER + ':' + DLINK_PASSWORD +  '@192.168.1.121'
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
	this.images = 

	setInterval(this.monitor.bind(this), options.interval, endpoint.miso)
	setInterval(this.monitor.bind(this), options.interval, endpoint.sushi)
}

/**
 * Monitoring logic happen here
 */
monitor.prototype.monitor = function (endpoint) {
	var cb = this.onDetect

	async.forever(
		function (next) {
			download(endpoint + '/image.jpg', function () {
				
			})	
		},
		function (err) {
			console.log(err)
		}
	)	
}

/**
 * Download image from dink
 */
var download = function(uri, callback){
  request.get(
		uri, function(err, res, body){
			//request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
			//console.log(body)
		}
	)

}
