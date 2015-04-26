var Player = require('player');
var RESDIR = __dirname + "/../../res/";

module.exports = exports = noty = function (opt) {
	
}

noty.prototype.warning = function () {

	var player = new Player([
		RESDIR + 'cotrom.mp3',
		RESDIR + 'cotrom.mp3'
	])

	player.play(function(err, player) {
		console.log("Play warning sound")		
	})

}
