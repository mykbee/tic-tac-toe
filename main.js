
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'Veggies';
var player2 = 'Junkfood';
var currentPlayer = null;
var winner = null;
var gameOver = false;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  // first grid is horizontal win

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]  
  // vertical win  
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
  // diagonal win
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
  )
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    winner = currentPlayer
    $(document).trigger('game-win');
  }
};

$(document).on('click', '#board .space', function (e) {
  if (gameOver) {
    return;
  };
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);
  if (spaces[spaceNum]) {
    return;
  };
  // Marks the space with the current player's name
  // TODO: Don't mark it unless the space is blank
  spaces[spaceNum] = currentPlayer;
  // Adds a class to elem so css can take care of the visuals
  $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

  checkForWinner();
  setNextTurn();
});

$(document).on('game-win', function (e) {
  // TODO: Alert who won the game
  alert(winner + " won the game!")
  gameOver = true;
});

// Start the game
setNextTurn();
