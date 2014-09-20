Games = new Meteor.Collection('games');

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('user_home');
  this.route('game_search', {
    data: function() {
      return {
        results: Games.find({ name: Session.get('query') })
      };
    }
  });
  this.route('play_game', {
    path: '/play_game/:_name',
    data: function () {
      var players = ['Graham', 'Carey', 'Michael'],
        scoreItems = ['Settlements', 'Cities'];

      return {
        game: {
          bgglink: 'http://boardgamegeek.com/boardgame/13/settlers-catan',
          name: 'Settlers of Catan'
        },
        players: players,
        scoreItems: scoreItems
      };
    }
  });
});

if (Meteor.isClient) {
  Template.game_search.events({
    'submit .search-form': function (e, tmpl) {
      Session.set('query', tmpl.find('input[name=gameName]').value);
      e.preventDefault();
    }
  });
}
