Games = new Meteor.Collection('games', {
  transform: function(x) {
    var out = {
      players: x.players.map(function(player) {
        return Meteor.users.findOne(player);
      }),
      game: x.game,
      scores: x.scores
    };

    return out;
  }
});

if (Meteor.isClient) {
  Router.onBeforeAction('dataNotFound');
}

// Ensure that people are logged in before they can access _ANYTHING_
Router.configure({
  before: function(pause) {
    var routeName = this.route.name;

    if (_.include(['home'], routeName)) // SKIP
      return undefined;

    var user = Meteor.user();
    if (! user) {
      this.render(Meteor.loggingIn() ? this.loadingTemplate : 'home');
      return pause();
    }
    return undefined;
  },
  notFoundTemplate: 'not_found',
  layoutTemplate: 'layout'
});

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
  this.route('play', {
    path: '/play/:_id',
    data: function() { return Games.findOne({ _id: this.params._id }); }
  });
});

if (Meteor.isClient) {
  Template.game_search.events({
    'submit .search-form': function (e, tmpl) {
      Session.set('query', tmpl.find('input[name=gameName]').value);
      e.preventDefault();
    }
  });

  // Get the scopes when you log in! Woo!
  var scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.circles.read'];
  Accounts.ui.config({'requestPermissions': {'google':scopes}});
}

if (Meteor.isServer) {
  Meteor.methods({
    getCircles: function() {
      // Get all of the circles
      if (! this.userId) throw new Meteor.Error(400, 'You must be logged in to get your circles');

      var user = Meteor.users.findOne(this.userId);
      var accessToken = user.services.google.accessToken;
      var id = user.services.google.id;
      var circles = (HTTP.get("https://www.googleapis.com/plusDomains/v1/people/" + id + "/circles", {
        params: { access_token: accessToken }
      })).data.items;

      var people = circles.map(function(circle) {
        var peoplePeople = HTTP.get("https://www.googleapis.com/plusDomains/v1/circles/" + circle.id + "/people", {
          params: { access_token: accessToken }
        });

        return peoplePeople.data.items;
      }).reduce(function(x, y) { return x.concat(y); }, []);

      return people;
    }
  });
}
