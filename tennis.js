var fs = require("fs");
var teams = require("./teams.json");
var Team1 = teams.Team1;
var Team2 = teams.Team2;

var maxSets = 3; //best out of #
var maxGames = 6;
var points = [0,15,30,40,"Deuce","AD"];

var Score = {
    Team1: {
        point:0,
        game:0,
        set:0,
        sets : [0,0,0]
    },
    Team2: {
        point:0,
        game:0,
        set:0,
        sets : [0,0,0]
    }
};

function getTeamPoint(team){
    return Score[team].point
}

function getTeamGame(team){
    return Score[team].game;
}

function getTeamSet(team){
    return Score[team].set;
}

function getTeamSets(team){
    return Score[team].sets;
}

function coinFlip(){
    //determine which team goes first
    var num = Math.random();
    var team;
    if (num > 0.5) team = "Team1";
    else team = "Team2";
    console.log("%s wins the coin toss and serves first", team);
    return team;
}

function getJargonScore(point){
    if (point == 0) return "0";
    if (point == 1) return "15";
    if (point == 2) return "30";
    if (point == 3) return "40";
}

function getScore(serveTeam){
    var t1Indicator, t2Indicator, t1Point, t2Point;
    if (serveTeam == "Team1"){
        t1Indicator = "*", t2Indicator = " ";
    } else{
        t1Indicator = " ", t2Indicator = "*";
    }
    t1Point = getJargonScore(Score.Team1.point);
    t2Point = getJargonScore(Score.Team2.point);
    var str = "Score:\t" + t1Indicator + " Team1: " + t1Point;
    str += "\n\t" + t2Indicator + " Team2: " + t2Point;
    str += "\n";
    console.log(str);
}

function getScoreBoard(serveTeam, adTeam1, adTeam2){
    var lines = "";
    var t1Indicator, t2Indicator;
    var t1Point = getJargonScore(getTeamPoint("Team1")),
        t2Point = getJargonScore(getTeamPoint("Team2"));
    for (var s=0;s<maxSets;s++){
        lines += "--";
    }
    var str = "\tPoint\tSets\n";
    str += "\t----\t-" + lines;
    
    if (serveTeam == "Team1"){
        t1Indicator = "*", t2Indicator = " ";
    } else{
        t1Indicator = " ", t2Indicator = "*";
    }
    str += "\n"
    
    str += t1Indicator + " Team1";
    str +=  " |";
    if (t1Point.toString().length == 2) str += t1Point;
    else if(t1Point.toString().length ==1) str += " " + t1Point;
    //AD
    str += "|\t";
    for (var s=0; s<maxSets;s++){
        str += "|" + getTeamSets("Team1")[s];
    }
    str += "|";

    str += "\n\t----\t-" + lines;
    str += "\n";
    str += t2Indicator + " Team2";
    str += " |";
    if (t2Point.toString().length == 2) str += t2Point;
    else if(t2Point.toString().length ==1) str += " " + t2Point;
    //AD
    str += "|\t";
    for (var s=0; s<maxSets;s++){
        str += "|" + getTeamSets("Team1")[s];
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
    var sum = Score.Team1.point + Score.Team2.point;
    var side;
    if (sum %2 == 0) side = "Right";
    else side = "Left";
}

function play(){
    console.log("Tennis game started!");
    // console.log("Team 1 (%s & %s) vs. Team 2 (%s, %s)", Team1.player1.name, Team1.player2.name, Team2.player1.name, Team2.player2.name);
    var serveTeam = coinFlip();
    console.log(serveTeam);
    var servePlayer = teams[serveTeam];
    drawCourt();
    // while (Score.Team1.set < maxSets && Score.Team2.set < maxSets ){   
    // }
    // while (Score.Team1.game < maxGames && Score.Team2.game < maxGames){
    //     if (Score.Team1.game == 5 && Score.Team2.game == 5){
    //         playTieBreker();
    //     }
    // }
    while (Score.Team1.point < 4 && Score.Team2.point < 4 ){
        // getScore(serveTeam);
        getScoreBoard(serveTeam);
        if (Score.Team1.point == 3 && Score.Team2.point == 3){
            playDeuce();    
        }
        else {
            playPoint();
        }   
    }
    if (Score.Team1.point == 4){
        Score.Team1.game++;
    } else{
        Score.Team2.game++;
    }
}

function playPoint(){
    var num = Math.random();
    var winner;
    if (num > 0.5) {
        winner = "Team1";
        Score.Team1.point++;
    }
    else {
        winner = "Team2";
        Score.Team2.point++;
    }
    return winner;
}

function playDeuce(){
    console.log("DEUCE");

}

function playTieBreaker(){

}

play();