var fs = require("fs");

var Team = require("./Team.js")
var Player = require("./Player.js");
var Team1, Team2;

var maxSets = 3; //best out of #
var maxGames = 6;

function init(){
    var t1p1, t1p2, t2p1, t2p2;
    t1p1 = new Player("Mallory", "right", 1, 0.7, 0.8, 0.75);
    t2p2 = new Player("Amanda", "left", 2, 0.8, 0.9, 0.8);
    t2p1 = new Player("Larissa", "right", 2, 0.5, 0.85, 0.8);
    t2p2 = new Player("Sahana", "left", 1, 0.8, 0.9, 0.85);
    Team1 = new Team("A&M", t1p1, t1p2);
    Team2 = new Team("L&S", t2p1, t2p2);
}

function coinFlip(){
    //determine which team goes first
    var num = Math.random();
    var team;
    if (num > 0.5) team = Team1;
    else team = Team2;
    console.log("%s wins the coin toss and serves first", team.getName());
    return team;
}

function getScoreBoard(serveTeam, adTeam1, adTeam2){
    var lines = "";
    var t1Indicator, t2Indicator;
    var t1Point = Team1.getJargonPoint();
        t2Point = Team2.getJargonPoint();
    for (var s=0;s<maxSets;s++){
        lines += "--";
    }
    var str = "\tPoint\tSets\n";
    str += "\t----\t-" + lines;
    
    if (serveTeam.getName() == Team1.getName()){
        t1Indicator = "*", t2Indicator = " ";
    } else{
        t1Indicator = " ", t2Indicator = "*";
    }
    str += "\n"
    
    str += t1Indicator + " " + Team1.getName();
    str +=  "\t|";
    if (t1Point.toString().length == 2) str += t1Point;
    else if(t1Point.toString().length ==1) str += " " + t1Point;
    if (adTeam1){
        str += "|AD  ";
    } else {
        str += "|    ";
    }
    for (var s=0; s<maxSets;s++){
        var x = Team1.getNthSetScore(s);
        str += "|";
        str += (x != null) ? x : 0;
    }
    str += "|";

    str += "\n\t----\t-" + lines;
    str += "\n";
    str += t2Indicator + " " + Team2.getName();
    str += "\t|";
    if (t2Point.toString().length == 2) str += t2Point;
    else if(t2Point.toString().length ==1) str += " " + t2Point;
    if (adTeam2){
        str += "|AD  ";
    } else{
        str += "|    ";
    }
    for (var s=0; s<maxSets;s++){
        var x = Team2.getNthSetScore(s);
        str += "|";
        str += (x != null) ? x : 0;
    }
    str += "|";

    str += "\n\t----\t-" + lines;
    str += "\n"
    console.log(str);
}

function drawCourt(){
    var court = fs.readFileSync("court.txt", "utf8");
    console.log(court);
}

function getServer(){

}

function getSide(){
    var sum = Team1.getCurrentPoint() + Team2.getCurrentPoint();
    var side;
    if (sum %2 == 0) side = "Right";
    else side = "Left";
}

function play(){
    init();
    console.log("Tennis game started!");
    // console.log("Team 1 (%s & %s) vs. Team 2 (%s, %s)", Team1.player1.name, Team1.player2.name, Team2.player1.name, Team2.player2.name);
    var serveTeam = coinFlip(),
        nextServer;
    drawCourt();
    // playSet(serveTeam);
    while (Team1.getCurrentSet() + Team2.getCurrentSet() < maxSets ){
        playSet(serveTeam);
        console.log(Team1.getCurrentSet(), Team2.getCurrentSet());
        
        Team1.clearCurrentSet();
        Team2.clearCurrentSet();
        
    }
}

function playSet(serveTeam){
    while (Team1.getCurrentGame() < maxGames && Team2.getCurrentGame() < maxGames){
        playGame(serveTeam);
        nextServer = (serveTeam.getName()== Team1.getName()) ? Team2 : Team1;
        serveTeam = nextServer;
        if (Team1.getCurrentGame() == (maxGames-1) && Team2.getCurrentGame() == (maxGames-1)){
            getScoreBoard(serveTeam);//
            playTieBreaker55(serveTeam);
        }

    }
    if (Team1.getCurrentGame() == maxGames){
        Team1.wonSet();
    } else {
        Team2.wonSet();
    }
    getScoreBoard(serveTeam);
    Team1.clearCurrentGame();
    Team2.clearCurrentGame();
}

function playGame(serveTeam){
    while (Team1.getCurrentPoint() < 4 && Team2.getCurrentPoint() < 4 ){
        // getScoreBoard(serveTeam);
        if (Team1.getCurrentPoint() == 3 && Team2.getCurrentPoint() == 3){
            playDeuce(serveTeam);
        }
        else {
            playPoint();
        }   
    }
    if (Team1.getCurrentPoint() == 4){
        Team1.wonGame();
    } else {
        Team2.wonGame();
    }
    Team1.clearCurrentPoint();
    Team2.clearCurrentPoint();
    console.log("********** Game over **********\n");
}

function playPoint(){
    var num = Math.random();
    var winner;
    if (num > 0.5) {
        winner = Team1;
        Team1.wonPoint();
    }
    else {
        winner = Team2;
        Team2.wonPoint();
    }
    return;
}

function playDeuce(serveTeam){
    var t1 = 0, t2 = 0, num;
    while (Math.abs(t1-t2) < 2){
        num = Math.random();
        if (num > 0.5){
            t1++;
        } else{
            t2++;
        }
        if (t1 == (t2+1)){
            // getScoreBoard(serveTeam, 1, 0);
        } else if (t2 == (t1+1)){
            // getScoreBoard(serveTeam, 0, 1);
        } else if (t1 == t2){
            // getScoreBoard(serveTeam);
        }
    }
    if (t1 > t2){
        Team1.wonPoint();
    } else{
        Team2.wonPoint();
    }
    return;
}

function playTieBreaker55(serveTeam){
    console.log("5-5");
    //t1=5, t2=5;
    playGame(serveTeam);
    playGame(serveTeam);
    if (Team1.getCurrentGame() == maxGames && Team2.getCurrentGame() == maxGames){
        playTieBreaker();
    } else{
        if (Team1.getCurrentGame() == (maxGames+1)){
            Team1.wonSet();
        } else{
            Team2.wonSet();
        }
        Team1.clearCurrentGame();
        Team2.clearCurrentGame();
    }
    return;
}

function playTieBreaker(serveTeam){
    console.log("Tiebreaker 6-6");
}

play();