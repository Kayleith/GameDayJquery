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
    // this.updateBoard(this.snake.body);
  };

  var Apple = Game.Apple = function(pos) {
    this.pos = pos;
  }

  Board.prototype.updateBoard = function (tail) {
    var x = tail.pos.pos[0];
    var y = tail.pos.pos[1];
    this.board[x][y] = undefined;

    for (var i = 0; i < this.snake.body.length; i++) {
      var row = this.snake.body[i].pos.pos[0];
      var col = this.snake.body[i].pos.pos[1];
      this.board[row][col] = this.snake.body[i];
    }
  };

  Board.prototype.render = function ($display) {
    for (var row = 0; row < this.board.length; row++) {
      for (var col = 0; col < this.board[row].length; col++) {
        if(this.board[row][col] === undefined) {
          $($($display.children()[row]).children()[col]).removeClass("snake apple")
        } else if(this.board[row][col] instanceof Game.snakeBody) {
          $($($display.children()[row]).children()[col]).removeClass("apple");
          $($($display.children()[row]).children()[col]).addClass("snake");
        } else if(this.board[row][col] instanceof Apple) {
          $($($display.children()[row]).children()[col]).addClass("apple");
        }
      }
    }
  };

  Board.prototype.generateApple = function () {
    var row = Math.floor(Math.random()*(MAXX - 1));
    var col = Math.floor(Math.random()*(MAXY - 1));
    if(this.board[row][col] === undefined){
      var apple = new Apple(new Game.Coord(row, col));
      this.board[row][col] = apple;
      return apple;
    } else {
      this.generateApple();
    }
  }
  // Board.prototype.removeApple = function (row, col) {
  //   $($($display.children()[row]).children()[col]).removeClass("apple");
  // };
  Board.prototype.addApple = function () {
    if(Math.random() < 0.1){
      this.apples.push(this.generateApple());
    }
  };
})();
