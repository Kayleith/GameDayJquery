(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$grid = $el;
  };

  View.prototype.bindEvents = function () {
    this.$grid.on("click", "li", function(event) {
      var $li = $(event.currentTarget);
      this.makeMove($li);
    }.bind(this));
  };

  POS = [
    [0,0],
    [0,1],
    [0,2],
    [1,0],
    [1,1],
    [1,2],
    [2,0],
    [2,1],
    [2,2]
  ];

  View.prototype.makeMove = function ($square) {
    var currentPlayer = this.game.currentPlayer;
    var pos = POS[$square.index()];
    try {
      this.game.playMove(pos);
    }
    catch(e) {
      return alert(e.msg);
    }
    if(currentPlayer === "x"){
      $square.addClass("placeX");
    } else {
      $square.addClass("placeO");
    }

    if (this.game.isOver()) {
      this.$grid.off();
      $("li").addClass("gameOver");

      var winner = this.game.winner();
      if(winner) {
        $("ul").after("<p>" + winner.toUpperCase() + " is the WINNER! </p>");
        // alert(winner + " is the WINNER!");
      } else {
        $("ul").after("<p> It is a Draw!!</p>");
        // alert("It is a draw!")
      }
    }
  };

  View.prototype.setupBoard = function () {
  };
})();
