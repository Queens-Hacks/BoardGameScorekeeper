Router.map(function() {
  this.route('home', { path: '/' });
  this.route('login');
  this.route('game_selection');
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
  this.route('user_home');
});


