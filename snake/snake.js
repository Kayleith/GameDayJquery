;(function(){
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  DIR = {
    "N": new Game.Coord(-1, 0),
    "S": new Game.Coord(1, 0),
    "W": new Game.Coord(0, -1),
    "E": new Game.Coord(0, 1)
  };
  var snakeBody = Game.snakeBody = function(pos) {
    this.pos = pos;
  }

  var Snake = Game.Snake = function(board, length, pos, $document, player) {
    this.$display = $document;
    this.board = board;
    this.body = new Array();
    this.body.push(new snakeBody(pos));
    this.player = player;
    switch(this.player)
    {
      case 1:
        this.dir = DIR["E"];
        // for (var i = 1; i <0 length; i++) {
        //   var newPos = pos.plus(DIR["W");
        //   for (var j = 1;  j <= i; j++) {
          this.body.push(new snakeBody(pos.plus(DIR["W"])));
        //   }
        // }
        break;
      case 2:
        this.dir = DIR["W"];
        this.body.push(new snakeBody(pos.plus(DIR["E"])));
    }
  };

  Snake.prototype.move = function () {
    var head = this.body[0].pos.plus(this.dir);
    switch(this.checkCollision(head))
    {
      case 0:
        return true;
      case 1:
        var tail = this.body.pop();
        break;
      case 2:
        var tail = null;
        break;
    }
    this.body.unshift(new snakeBody(head));
    this.board.updateBoard(tail);
    return false;
  };

  Snake.prototype.turn = function (newDir) {
    if (!this.dir.isOpposite(newDir)) {
      this.dir = newDir;
    }
  };

  Snake.prototype.checkCollision = function (otherPos) {
    var row = otherPos.pos[0];
    var col = otherPos.pos[1];
    if(row < 0 || row >= this.board.board.length || col < 0 || col >= this.board.board[0].length) {
      return 0;
    }
    if(this.board.board[row][col] !== undefined)
    {
      if(this.board.board[row][col] instanceof snakeBody) {
        return 0;
      } else if(this.board.board[row][col] instanceof Game.Apple) {
        this.board.removeApple(row, col);
        return 2;
      }
    }
    return 1;
  };

  Snake.prototype.render = function () {
    for (var i = 0; i < this.body.length; i++) {
      var x = this.body[i].pos.pos[0];
      var y = this.body[i].pos.pos[1];
      $($(this.$display.children()[x]).children()[y]).addClass("snake" + this.player);
    }
  };
})();
