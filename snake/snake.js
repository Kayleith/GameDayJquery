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

  var Snake = Game.Snake = function(board, length, pos) {
    this.board = board;
    this.body = new Array();
    this.dir = DIR["E"];
    this.body.push(pos);
    this.body.push(pos.plus(this.dir));
  };

  Snake.prototype.move = function () {
    tail = this.body.pop();
    this.body.unshift(this.body[0].plus(this.dir));
    this.board.updateBoard(tail);
  };

  Snake.prototype.turn = function (newDir) {
    if (!this.dir.isOpposite(newDir)) {
      this.dir = newDir;
    }
  };
})();
