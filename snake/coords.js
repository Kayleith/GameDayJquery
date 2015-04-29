;(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Coord = Game.Coord = function(x,y) {
    this.pos = [x,y];
  };

  Coord.prototype.plus = function (otherCoord) {
    return new Coord(this.pos[0] + otherCoord.pos[0], this.pos[1] + otherCoord.pos[1]);
  };

  Coord.prototype.equals = function (otherCoord) {
    return this.pos[0] === otherCoord.pos[0] && this.pos[1] === otherCoord.pos[1];
  };

  Coord.prototype.isOpposite = function (otherCoord) {
    return -this.pos[0] === otherCoord.pos[0] && -this.pos[1] === otherCoord.pos[1];
  };
})();
