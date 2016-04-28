var Player = function(name, position, serveOrder, firstServePct, secServePct, strokePct){
	this.name = name;
	this.position = position;
	this.serveOrder = serveOrder;
	this.firstServePct = firstServePct;
	this.secServePct = secServePct;
	this.strokePct = strokePct;
}

module.exports = Player;
