var game = game || {};
game.images = [];
game.cvs;
game.ctx;
game.turn = "x";

function onBoardClick(){

}

function init() {
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    game.cvs = document.getElementById("gameCanvas");
    game.ctx = game.cvs.getContext("2d");

    game.images.blank = new Image();
    game.images.blank.src = "img/blank.bmp";
    game.images.x = new Image();
    game.images.x.src = "img/x.bmp";
    game.images.o = new Image();
    game.images.o.src = "img/o.bmp";
    
    game.db = window.openDatabase("Database", "1.0", "tictactoe", 200000);
    db.transaction(populateDB, errorCB, successCB);

}

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS RECORDS (id unique, timestamp, winner, duration)');
}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM RECORDS', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var container = document.getElementById("listcontainer");
    for (var i=0; i<len; i++){
        var text = "Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data;
        console.log(text);
        var newelement = document.createElement("p");
        newelement.appendChild(document.createTextNode(text));
        container.appendChild(newelement);
    }
}

function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

function successCB() {
    var db = window.openDatabase("Database", "1.0", "GameRecords", 200000);
    db.transaction(queryDB, errorCB);
}