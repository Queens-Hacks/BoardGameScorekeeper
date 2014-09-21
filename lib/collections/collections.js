Games = new Meteor.Collection('games', {
  transform: function(game) {
    var theGame = BoardGames.findOne(game.game);
    game.game = theGame;
    return game; // You lost
  }
});

Circles = new Meteor.Collection('circles');

BoardGames = new Meteor.Collection('boardGames');
