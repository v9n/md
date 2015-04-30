/**
 * Grab an image every 200ms, compare with previous image.
 * It then return an promise  
 *
 */
var Promise = require('bluebird')
var request = require('request')
var async   = require('async')
var fs      = require('fs')

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
	this.onDetect = cb

	setInterval(this.monitor.bind(this), options.interval, 'miso', endpoint.miso)
	setInterval(this.monitor.bind(this), options.interval, 'sushi', endpoint.sushi)
}

/**
 * Monitoring logic happen here
 */
monitor.prototype.monitor = function (device, endpoint) {
	var cb = this.onDetect

	async.forever(
		function (next) {
			download(device, endpoint + '/image.jpg', function () {
				
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
var download = function (device, uri, callback) {
	var filename = 1
	calculateFilename('image/' + device, function (filename) {
		request(uri)
				.pipe(fs.createWriteStream('image/' + device + "/" + filename + '.jpg'))
				.on('close', callback);
	})
  /*request.get(
		uri, function(err, res, body){
			//request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
			//console.log(body)
		}
	)*/

}

var calculateFilename = function (directory, cb) {
	var filename = 1
	fs.exists(directory + '/1.jpg', function (exists) {
		if (!exists) return cb(1)
		fs.exists(directory + '/2.jpg', function (exists) {
			if (!exists) return cb(2)
			fs.exists(directory + '/3.jpg', function (exists) {
				if (!exists) return cb(3)
				fs.exists(directory + '/4.jpg', function (exists) {
					if (!exists) return cb(4)
						fs.exists(directory + '/5.jpg', function (exists) {
							if (!exists) return cb(5)
							//Now, we have enough files in our image pool
							//we will archive first file
							cb(5)	
						})
				})
			})
		})
	})
}

