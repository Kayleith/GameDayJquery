;(function() {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  SNAKESIZE = 2;
  MAXX = 60;
  MAXY = 60;
  SNAKEPOS = new Game.Coord(Math.floor(MAXX/2), Math.floor(MAXY/2));
  SNAKEPOS1 = new Game.Coord(Math.floor(4), Math.floor(4));
  SNAKEPOS2 = new Game.Coord(Math.floor(MAXX - 5), Math.floor(MAXY - 5));

  var Board = Game.Board = function($document) {
    this.$display = $document;
    this.board = new Array(MAXX);
    for (var row = 0; row < this.board.length; row++) {
      this.board[row] = new Array(MAXY);
    }
    this.generatePortal();
    this.snake1 = new Game.Snake(this, SNAKESIZE, SNAKEPOS1, $document, 1);
    this.snake2 = new Game.Snake(this, SNAKESIZE, SNAKEPOS2, $document, 2);
  };

  Board.prototype.updateBoard = function (tail) {
    if(tail) {
      var x = tail.pos.pos[0];
      var y = tail.pos.pos[1];
      this.board[x][y] = undefined;
      $($(this.$display.children()[x]).children()[y]).removeClass("snake1 snake2");
    }

    for (var i = 0; i < this.snake1.body.length; i++) {
      var row = this.snake1.body[i].pos.pos[0];
      var col = this.snake1.body[i].pos.pos[1];
      this.board[row][col] = this.snake1.body[i];
    }
    for (var i = 0; i < this.snake2.body.length; i++) {
      var row = this.snake2.body[i].pos.pos[0];
      var col = this.snake2.body[i].pos.pos[1];
      this.board[row][col] = this.snake2.body[i];
    }
  };

  Board.prototype.render = function () {
    this.snake1.render();
    this.snake2.render();
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
