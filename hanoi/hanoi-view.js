(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function(game, $el) {
    this.game = game;
    this.$poles = $el;
    this.setUpBoard();
    this.keyBinder();
  }

  View.prototype.setUpBoard = function () {
    $($($poles.children()[0]).children()[0]).addClass("block1");
    $($($poles.children()[0]).children()[1]).addClass("block2");
    $($($poles.children()[0]).children()[2]).addClass("block3");
  };

  View.prototype.keyBinder = function () {
    $poles.one("click", "section", function(event) {
      var $fromPole = $(event.currentTarget);
      $fromPole.addClass("chosen");
      $poles.one("click", "section", function(event1) {
        var $toPole = $(event1.currentTarget);
        this.moveBlock($fromPole, $toPole);
      }.bind(this))
    }.bind(this))
  };

  View.prototype.moveBlock = function ($from, $to) {
    var validMove = this.game.move($from.index(), $to.index());
    if (!validMove) {
      alert("Not a valid move!");
    }
    this.render();
    if (this.game.isWon()) {
      $("article").after("<small> You Won! </small>");
    } else {
      this.keyBinder();
    }
  };

  SPOT = [2,1,0];

  View.prototype.render = function (  ) {
    $('section').removeClass('chosen');
    $("div").removeClass("block1 block2 block3");
    for(var pole = 0; pole < this.game.towers.length; pole++){
      for(var spot = this.game.towers[pole].length - 1; spot >= 0; spot--){
        var size = this.game.towers[pole][spot];
        $($($poles.children()[pole]).children()[SPOT[spot]]).addClass("block" + size);
      }
    }
  };

})();
