;(function() {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  SNAKESIZE = 2;
  MAXX = 60;
  MAXY = 60;
  SNAKEPOS = new Game.Coord(Math.floor(MAXX/2), Math.floor(MAXY/2));

  var Board = Game.Board = function($document) {
    this.$display = $document;
    this.board = new Array(MAXX);
    for (var row = 0; row < this.board.length; row++) {
      this.board[row] = new Array(MAXY);
    }
    this.generatePortal();
    this.snake = new Game.Snake(this, SNAKESIZE, SNAKEPOS, $document);
  };

  Board.prototype.updateBoard = function (tail) {
    if(tail) {
      var x = tail.pos.pos[0];
      var y = tail.pos.pos[1];
      this.board[x][y] = undefined;
      $($(this.$display.children()[x]).children()[y]).removeClass("snake");
    }

    for (var i = 0; i < this.snake.body.length; i++) {
      var row = this.snake.body[i].pos.pos[0];
      var col = this.snake.body[i].pos.pos[1];
      this.board[row][col] = this.snake.body[i];
    }
  };

  Board.prototype.render = function () {
    this.snake.render();
  };

  var Apple = Game.Apple = function(pos) {
    this.pos = pos;
  }

  Board.prototype.generateApple = function () {
    var row = Math.floor(Math.random()*(MAXX - 1));
    var col = Math.floor(Math.random()*(MAXY - 1));
    if(this.board[row][col] === undefined){
      this.board[row][col] = new Apple(new Game.Coord(row, col));
      $($(this.$display.children()[row]).children()[col]).addClass("apple");
    } else {
      this.generateApple();
    }
  }

  Board.prototype.removeApple = function (row, col) {
    this.board[row][col] = undefined;
    $($(this.$display.children()[row]).children()[col]).removeClass("apple");
  };

  var Portal = Game.Portal = function(pos1, pos2) {
    this.pos1 = pos1;
    this.pos2 = pos2;
  }

  Board.prototype.generatePortal = function () {
    var row = Math.floor(Math.random()*(MAXX - 1));
    var col = Math.floor(Math.random()*(MAXY - 1));
    var row1 = Math.floor(Math.random()*(MAXX - 1));
    var col1 = Math.floor(Math.random()*(MAXY - 1));
    if(this.board[row][col] === undefined && this.board[row1][col1] === undefined){
      this.board[row][col] = new Portal(new Game.Coord(row, col), new Game.Coord(row1, col1));
      this.board[row1][col1] = this.board[row][col];

      $($(this.$display.children()[row]).children()[col]).addClass("portal");
      $($(this.$display.children()[row1]).children()[col1]).addClass("portal");
    } else {
      this.generatePortal();
    }
  };

  Board.prototype.addItems = function () {
    if(Math.random() < 0.05){
      this.generateApple();
    }
  };
})();
