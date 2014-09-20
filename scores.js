Games = new Meteor.Collection('games', {
  transform: function(game) {
    var theGame = BoardGames.findOne(game.game);
    game.game = theGame;
    return game; // You lost
  }
});
Circles = new Meteor.Collection('circles');

function getCircles(userId) {
  // Get all of the circles
  try {
    var user = Meteor.users.findOne(userId);
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

    Circles.remove({ user: userId });
    people.forEach(function(person) {
      person.user = userId;
      Circles.insert(person);
    });
  } catch(e) { /* Non-event, no big deal */ }

  return people;
}

if (Meteor.isServer) {
  Meteor.users.find().observeChanges({
    added: function(id) {
      getCircles(id);
    },
    changed: function(id) {
      getCircles(id);
    }
  });
}

// Configuration on the client for Meteor
if (Meteor.isClient) {
  Session.setDefault('searchQuery', '');
  Router.onBeforeAction('dataNotFound');
  // Get the scopes when you log in! Woo!
  var scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.circles.read'];
  Accounts.ui.config({'requestPermissions': {'google':scopes}, 'requestOfflineToken': {'google': true}});
}

// Yeah, we need to do this...
RegExp.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

/* var circlesFetched = false;
function fetchCircles() {
  if (! circlesFetched) {
    circlesFetched = true;
    console.log('here');
    Meteor.call('getCircles', function(err, res) {
      if (err) /* Fuck * / console.error(err);

      res.forEach(function(person) {
        Circles.insert(person);
      });
    });
  }
} */


// Ensure that people are logged in before they can access _ANYTHING_
Router.configure({
  before: function(pause) {
    var routeName = this.route.name;

    if (_.include(['play'], routeName)) // SKIP
      return undefined;

    var user = Meteor.user();
    if (! user) {
      this.render(Meteor.loggingIn() ? this.loadingTemplate : 'login');
      return pause();
    }
    return undefined;
  },
  notFoundTemplate: 'not_found',
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    data: function() {
      if (Meteor.user()) {
        return {
          active: Games.find({ players: { $elemMatch: { name: Meteor.user().profile.name } }, retired: {$not: true}  }),
          inactive: Games.find({ players: { $elemMatch: { name: Meteor.user().profile.name } }, retired: true })
        };
      }
      return {};
    }
  });

  this.route('game_search', {
    data: function() {
      return {
        results: BoardGames.find({ name: {
          $regex: RegExp.escape(Session.get('searchQuery')), $options: 'i'
        }})
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
    'keyup .search-form': function (e, tmpl) {
      e.preventDefault();
      Session.set('searchQuery', tmpl.find('input[name=gameName]').value);
    },
    'click .new-game-link': function(e, tmpl) {
      e.preventDefault();
      var _id = e.currentTarget.getAttribute('data-id');

      Meteor.call('makeGame', _id, function(err, res) {
        if (err) {
          console.error(err);
          return;
        }
        Router.go('play', {_id: res});
      });
    }
  });

  Template.play.events({
    'click .add-player': function(e, tmpl) {
      var gameId = Router._currentController.params._id;
      var game = Games.findOne(gameId);

      Games.update(gameId, {
        $push: {
          players: {
            _id: Random.id(),
            name: '',
            score: 0
          }
        }
      });
    },

    'keyup .player-score-input, blur .player-score-input': function(e, tmpl) {
      var val = e.currentTarget.value;
      var _id = e.currentTarget.getAttribute('data-id');

      var gameId = Router._currentController.params._id;
      var game = Games.findOne(gameId);

      game.players.forEach(function(player, i) {
        if (_id === player._id) {
          var set = {};
          set['players.' + i + '.score'] = parseFloat(val);

          Games.update(gameId, {$set: set});
        }
      });
    },

    'keyup .player-name-input, blur .player-name-input': function (e, tmpl) {
      var val = e.currentTarget.value;
      var _id = e.currentTarget.getAttribute('data-id');

      var gameId = Router._currentController.params._id;
      var game = Games.findOne(gameId);

      game.players.forEach(function(player, i) {
        if (_id === player._id) {
          var set = {};
          set['players.' + i + '.name'] = val;

          Games.update(gameId, {$set: set});
        }
      });
    },

    'click .player-remove': function(e, tmpl) {
      var _id = e.currentTarget.getAttribute('data-id');

      var gameId = Router._currentController.params._id;
      var game = Games.findOne(gameId);

      Games.update(gameId, {$set: {'players': game.players.filter(function(player) { return _id !== player._id; })}});
    }
  });

  Template.textbox.rendered = function(tmpl) {
    function findCircleMatches(q, cb) {
      var strs = Circles.find({ user: Meteor.userId() }).fetch().map(function(x) {
        return x.displayName;
      });

      var matches, substrRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: str });
        }
      });

      cb(matches);
    }

    var self = this;
    Deps.autorun(function() {
      $(self.find('input')).typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      }, {
        source: findCircleMatches
      });
    });
  };

}

var XML2JSCONFIG = {
  explicitArray: true
};
if (Meteor.isServer) {
  Meteor.methods({
    search: function(query){
      check(query, String);
      var url = 'http://www.boardgamegeek.com/xmlapi2/search?query='+encodeURIComponent(query)+'&type=boardgame,boardgameexpansion';
      var xml = HTTP.get(url).content;
      var games;
      xml2js.parseString(xml,
        XML2JSCONFIG,
        function (err, result){
          if (err){
            console.error("ERROR", err);
          } else {
            var gameIds = result.items.item.slice(0, Math.min(10, result.items.item.length)).map(
              function (game){
                return game.$.id;
              }
            );
            var xml2 = HTTP.get('http://www.boardgamegeek.com/xmlapi2/thing?&id=' + gameIds.join()).content;
            xml2js.parseString(xml2,
              XML2JSCONFIG,
              function (err, result){
                if (err){
                  console.error("ERROR", err);
                } else {
                  games = result.items.item;
                }
              }
            );
          }
        }
      );
      return games;
    }
  });


  Meteor.methods({
    makeGame: function(_id) {
      if (! this.userId) throw new Meteor.Error(403, 'You must be logged in to make a game');

      var user = Meteor.users.findOne(this.userId);
      return Games.insert({
        players: [
          {
            _id: Random.id(),
            name: user.profile.name,
            score: 0
          },
          {
            _id: Random.id(),
            name: '',
            score: 0
          },
          {
            _id: Random.id(),
            name: '',
            score: 0
          }
        ],
        game: _id
      });
    }
  });
}
