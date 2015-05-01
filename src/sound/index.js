var Player = require('player');
var RESDIR = __dirname + "/../../res/";

module.exports = exports = noty = function (opt) {
	this.resdir = RESDIR
}

noty.prototype.alarm = function () {

	var player = new Player([
		//RESDIR + 'cotrom.mp3',
		RESDIR + 'police.mp3',
		//RESDIR + 'cotrom.mp3'
	])

	player.play(function(err, player) {
		console.log("Play warning sound")		
	})

	player.on('playing',function(item){
		console.log('Im playing... src:' + item);
	});
	 
	// event: on playend 
	player.on('playend',function(item){
		// return a playend item 
		console.log('src:' + item + ' play done, switching to next one ...');
	});
	 
	// event: on error 
	player.on('error', function(err){
		// when error occurs 
		console.log(err);
	});

}
