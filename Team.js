var Team = function(teamName, p1, p2){
	this.name = teamName;
	this.p1 = p1;
	this.p2 = p2;
	this.scoreHistory = [];
	this.currentPoint = 0;
	this.currentGame = 0;
	this.currentSet = 0;
	this.currentSetNumber = 0;
}

Team.prototype.getName = function(){
	return this.name;
}

Team.prototype.getScoreHistory = function(){
	return this.scoreHistory;
}

Team.prototype.getNthSetScore = function(n){
	if (this.scoreHistory.length == 0) return 0;
	else return this.scoreHistory[n];
}

Team.prototype.getJargonPoint = function(){
	var point = this.currentPoint;
	if (point == 0) return "0";
    if (point == 1) return "15";
    if (point == 2) return "30";
    if (point == 3) return "40";
    else return "";
}

Team.prototype.getCurrentPoint = function(){
	return this.currentPoint;
}

Team.prototype.getCurrentGame = function(){
	return this.currentGame;
}

Team.prototype.getCurrentSet = function(){
	return this.currentSet;
}

Team.prototype.getCurrentSetNumber = function(){
	return this.getCurrentSetNumber;
}

Team.prototype.clearCurrentPoint = function(){
	this.currentPoint = 0;
}

Team.prototype.clearCurrentGame = function(){
	this.currentGame = 0;
}

Team.prototype.clearCurrentSet = function(){
	// this.currentSet = 0;
	this.currentSetNumber++;
	this.scoreHistory.push(0);
}

Team.prototype.wonPoint = function(){
	this.currentPoint++;
}

Team.prototype.wonGame = function(){
	this.currentGame++;
	this.scoreHistory[this.currentSetNumber] = this.currentGame;
}

Team.prototype.wonSet = function(){
	this.currentSet++;
}


module.exports = Team;