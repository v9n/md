var async = require('async')
var request = require("request");
var MjpegConsumer = require("mjpeg-consumer");
var MotionStream = require("motion").Stream;
var FileOnWrite = require("file-on-write");

var stream = require('stream')
var utils  = require('util')
var Writable = stream.Writable
var Readable = stream.Readable

var DLINK_USER = process.env.DLINK_USER
var DLINK_PASSWORD = process.env.DLINK_PASSWORD

function ImageStream(options) {
	Readable.call(this, options)
}
utils.inherits(ImageStream, Readable)
ImageStream.prototype._read = function () {
	return false
	var url = 'http://' + DLINK_USER + ':' + DLINK_PASSWORD + '@192.168.1.117/image.jpg'
	var self = this
	setInterval(function () {
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				self.push(body)
			}
		}.bind(this))
	}.bind(this), 200)
}

function LogStream(options) {
	Writable.call(this, options)
}
utils.inherits(LogStream, Writable)
LogStream.prototype._write = function (chunk, enc, cb) {
	console.log(chunk)
}

var log = new LogStream({})

var writer = new FileOnWrite({ 
	path: './video',
	ext: '.jpg',
	filename: function(image) {
		return image.time;
	},
	transform: function(image) {
		return image.data;
	},
	sync: true
});

var consumer = new MjpegConsumer();
var motion = new MotionStream();

var username = DLINK_USER;
var password = DLINK_PASSWORD;
var options = {
	url: "http://192.168.1.117/image.jpg",
	headers: {
		'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
	}  
};
var options2 = {
	url: "http://192.168.1.121/image.jpg",
	headers: {
		'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
	}  
};

console.log("Start stream video ")
var imageStream = new ImageStream({})
//request(options)
imageStream
.pipe(log)
//.pipe(consumer)
//.pipe(motion)
//.pipe(writer)





var Motion = require('motion').Motion
var motion = new Motion()
var getPixels = require("get-pixels")

function monitor(ip, cb) {
	getPixels("http://" + DLINK_USER + ":" + DLINK_PASSWORD + "@" + ip + "/image.jpg", function(err, pixels) {
		if(err) {
			console.log("Bad image path")
			return
		}
		var size =  pixels.shape.slice()
		var rgb = new Array(size[0] * size[1] * size[2])
		for (w=1; w<=size[0]; w++) {
			for (h=1; h<=size[1]; h++) {
				for (dot=1; dot<=size[2]; dot++) {
					var pixel = pixels.get(w, h, dot)
					rgb[(w-1)*(h-1)+dot -1] = pixel
				}
			}
		}
		cb(rgb)
	})
}

module.exports = exports = function (options) {

}

exports.start = function (cb) {
	console.log("Start motion moitoring")
	async.forever(
		function(next) {
			monitor("192.168.1.117", function(rgb) {
				setTimeout(function () {
					monitor("192.168.1.117", function (rgb2) {
						if (motion.detect(rgb, rgb2)) {
							console.log('detected motion')
							cb()
						}
						next()	
					})
				}, 100)
			})
		},
		function(err) {
		}
	)
}
