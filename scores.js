Router.map(function() {
  this.route('home', { path: '/' });
  this.route('login');
  this.route('game_selection');
  this.route('play_game', { path: '/play_game/:_name' });
  this.route('user_home');
});
