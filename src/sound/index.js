var Player = require('player');
var RESDIR = __dirname + "/../../res/";

module.exports = exports = noty = function (opt) {
	this.resdir = RESDIR
}

noty.prototype.warning = function () {

	var player = new Player([
		this.resdir + 'cotrom.mp3',
		this.resdir + 'cotrom.mp3'
	])

	player.play(function(err, player) {
		console.log("Play warning sound")		
	})

}
