Games = new Meteor.Collection('games');
Circles = new Meteor.Collection(null);

if (Meteor.isClient) {
  Router.onBeforeAction('dataNotFound');
}

function findCircleMatches(q, cb) {
  var strs = Circles.find().fetch().map(function(x) {
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

  console.log(strs);

  cb(matches);
};

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
        results: Session.get('searchResults')
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
      e.preventDefault();
      Meteor.call('search', tmpl.find('input[name=gameName]').value, function (err, result){
        if (err){
          console.error("ERROR", err);
        } else {
          result = result.map(function (item){
              item.thumbnail = item.thumbnail[0];
              item.name = item.name[0].$.value;
              return item;
          });
          Session.set('searchResults', result);
          console.log(result);
        }
      });
    }
  });
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
    'keyup .player-score-input': function(e, tmpl) {
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

  var circlesFetched = false;
  Template.textbox.rendered = function(tmpl) {
    if (! circlesFetched) {
      circlesFetched = true;
      console.log('here');
      Meteor.call('getCircles', function(err, res) {
        if (err) /* Fuck */ console.error(err);

        res.forEach(function(person) {
          Circles.insert(person);
        });
      });
    }

    var self = this;
    Deps.autorun(function() {
      console.log(Circles.find().fetch());
      $(self.find('input')).typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      }, {
        source: findCircleMatches
      });
    });
  };

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
