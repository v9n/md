var Hapi = require('hapi');
var Phone = require('./src/call');
var phone = new Phone();

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'arm.axcoto.com', 
    port: 8235,
		address: '0.0.0.0'
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {
       reply('hello world');
    }
});

server.route({
	method: 'POST',
	path: '/call',
	handler: function (request, reply) {
		phone.callHome(reply)
	}
})

// Start the server
server.start();
