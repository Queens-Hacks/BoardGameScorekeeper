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

  'click .end-game-button': function(e, tmpl) {
    var gameId = Router.current().params._id;
    var game = Games.findOne(gameId);

    if (confirm('Are you sure you want to end the game?')) {
      Games.update(gameId, {
        $set: { retired: true }
      });
    }
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
