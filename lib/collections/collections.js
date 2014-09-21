Matches = new Meteor.Collection('matches', {
  transform: function(match) {
    var game = Games.findOne(match.game);
    match.game = game;
    return match;
  }
});

Circles = new Meteor.Collection('circles');

Games = new Meteor.Collection('games');
