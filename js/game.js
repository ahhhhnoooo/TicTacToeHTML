var game = game || {};

game.onTick = function () {
    ++game.duration;
    document.getElementById("duration_label").innerHTML = game.duration;
}

game.checkWinnerRow = function (a, b, c) {
    if (game.turn === game.board[a]
    && game.turn === game.board[b]
    && game.turn === game.board[c]) {
        return { a, b, c };
    }
}

game.onClickBoard = function(id)
{
    if (game.board[id] != undefined) return;
    if (game.inProgress == false) return;

    //Set board
    game.board[id] = game.turn;

    //Check for winner
    var winningPositions =
        game.checkWinnerRow(0, 1, 2) ||
        game.checkWinnerRow(3, 4, 5) ||
        game.checkWinnerRow(6, 7, 8) ||
        game.checkWinnerRow(0, 3, 6) ||
        game.checkWinnerRow(1, 4, 7) ||
        game.checkWinnerRow(2, 5, 8) ||
        game.checkWinnerRow(0, 4, 8) ||
        game.checkWinnerRow(2, 4, 6);

    //For updating the turn image to next player
    var nextImg = "img/x.bmp";
    //For updating the img that was clicked
    var newImg = "img/o.bmp";

    if (game.turn == "x") {
        game.turn = "o";
        nextImg = "img/o.bmp";
        newImg = "img/x.bmp";
    }
    else {
        game.turn = "x";
    }
    document.getElementById(id).src = newImg;

    if (winningPositions)
    {
        game.inProgress = false;
        window.clearInterval(game.timer);
        document.getElementById("turn_label").innerText = "WINNER";
    }
    else //No winner, update turn image
    {
        document.getElementById("turn_image").src = nextImg;
    }
}

game.reset = function()
{
    game.turn = "x";
    game.duration = 0;
    game.inProgress = true;
    game.board = [];
    game.timer = window.setInterval(game.onTick, 1000)
    document.getElementById("turn_label").innerText = "turn";
    document.getElementById("turn_image").src = "img/x.bmp";
    for(i = 0;i < 9; ++i)
    {
        document.getElementById(i).src = "img/blank.bmp";
    }
}