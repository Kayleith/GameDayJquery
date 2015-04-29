;(function() {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  SNAKESIZE = 2;
  MAXX = 60;
  MAXY = 60;
  SNAKEPOS = new Game.Coord(Math.floor(MAXX/2), Math.floor(MAXY/2));

  var Board = Game.Board = function() {
    this.board = new Array(MAXX);
    for (var row = 0; row < this.board.length; row++) {
      this.board[row] = new Array(MAXY);
    }
    this.snake = new Game.Snake(this, SNAKESIZE, SNAKEPOS);
    this.apples = [];
    this.updateBoard(SNAKEPOS);
  };

  Board.prototype.updateBoard = function (tail) {
    var x = tail.pos[0];
    var y = tail.pos[1];
    this.board[x][y] = undefined;

    for (var i = 0; i < this.snake.body.length; i++) {
      var x = this.snake.body[i].pos[0];
      var y = this.snake.body[i].pos[1];
      this.board[x][y] = this.snake.body[i];
    }
  };

  Board.prototype.render = function ($display) {
    for (var row = 0; row < this.board.length; row++) {
      for (var col = 0; col < this.board[row].length; col++) {
        if(this.board[row][col] === undefined) {
          $($($display.children()[row]).children()[col]).removeClass("snake")
        } else {
          $($($display.children()[row]).children()[col]).addClass("snake");
        }
      }
    }
  };
})();
