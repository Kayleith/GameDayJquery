;(function() {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var View = Game.View = function ($el) {
    this.board = new Game.Board($el);
    this.$display = $el;
    for (var i = 0; i < 60; i++) {
      this.$display.append("<ul class='row'></ul>");
    }
    for (var j = 0; j < 60; j++) {
      $(".row").append("<li class='block'></li>");
    }
    this.bindKeys();
  };

  DIR = {
    "N": new Game.Coord(-1, 0),
    "S": new Game.Coord(1, 0),
    "W": new Game.Coord(0, -1),
    "E": new Game.Coord(0, 1)
  };

  View.prototype.bindKeys = function () {
    $(document).on("keydown", function(e) {
      switch(e.which) {
        case 37: // left
          this.board.snake2.turn(DIR["W"]);
        break;

        case 38: // up
          this.board.snake2.turn(DIR["N"]);
        break;

        case 39: // right
          this.board.snake2.turn(DIR["E"]);
        break;

        case 40: // down
          this.board.snake2.turn(DIR["S"]);
        break;

        case 65: // left
          this.board.snake1.turn(DIR["W"]);
        break;

        case 87: // up
          this.board.snake1.turn(DIR["N"]);
        break;

        case 68: // right
          this.board.snake1.turn(DIR["E"]);
        break;

        case 83: // down
          this.board.snake1.turn(DIR["S"]);
        break;


        default: return;
    }
    e.preventDefault();
  }.bind(this))
  };

  View.prototype.render = function () {
    this.board.render();
  };

  View.prototype.update = function () {
    this.addItems();
    this.render();
    var snake1 = this.board.snake1.move()
    var snake2 = this.board.snake2.move();
    return snake1 || snake2;
  };

  View.prototype.addItems = function () {
    this.board.addItems();
  };
})();
