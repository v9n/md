var config = require('./src/config')
var Hapi = require('hapi')
var Phone = require('./src/call')
var Sound = require('./src/sound')
var Monitor = require('./src/monitor')
var async = require('async')

// Create a server with a host and port
var server = new Hapi.Server()
var phone = new Phone()
var sound = new Sound()
var monitor = new Monitor()

server.connection({ 
	host: 'arm.axcoto.com', 
	port: 8235,
	address: '0.0.0.0'
});

//static file
server.route({
	method: 'GET',
	path: '/res/{param*}',
	handler: {
		directory: {
			path: 'res',
			listing: true
		}
	}
})

// Add the route
server.route({
	method: 'GET',
	path:'/hello', 
	handler: function (request, reply) {
		reply('hello world');
	}
})

server.route({
	method: ['GET', 'POST'],
	path: '/call',
	handler: function (request, reply) {
		phone.callHome(reply)
	}
})

server.route({
	method: ['GET'],
	path: '/testAlarm',
	handler: function (request, reply) {
		reply('Queue the sound alarm and phone alarm')
		async.parallel([sound.alarm, phone.alarm])
	}
})

server.route({
	method: ['GET', 'POST'],
	path: '/play',
	handler: function (request, reply) {
		reply('Play sound')
		sound.alarm()
	}
})

// Start the server
server.start(function () {
	console.log('Server running at:', server.info.uri);
})

// Start monitoring service
monitor.start({interval: 200}, function () {
	console.log("Detected thief. Started warning")
	async.parallel([sound.alarm, phone.alarm])
})
