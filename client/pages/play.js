Template.play.events({
  'click .add-player': function(e, tmpl) {
    var matchId = Router.current().params._id;
    var match = Matches.findOne(matchId);

    Matches.update(matchId, {
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
    var matchId = Router.current().params._id;
    var match = Matches.findOne(matchId);

    if (confirm('Are you sure you want to end the game?')) {
      Matches.update(matchId, {
        $set: { retired: true }
      });
    }
  },

  'keyup .player-score-input, blur .player-score-input': function(e, tmpl) {
    var val = e.currentTarget.value;
    var _id = e.currentTarget.getAttribute('data-id');

    var matchId = Router.current().params._id;
    var match = Matches.findOne(matchId);

    match.players.forEach(function(player, i) {
      if (_id === player._id) {
        var set = {};
        set['players.' + i + '.score'] = parseFloat(val);

        Matches.update(matchId, {$set: set});
      }
    });
  },

  'keyup .player-name-input, blur .player-name-input': function (e, tmpl) {
    var val = e.currentTarget.value;
    var _id = e.currentTarget.getAttribute('data-id');

    var matchId = Router.current().params._id;
    var match = Matches.findOne(matchId);

    match.players.forEach(function(player, i) {
      if (_id === player._id) {
        var set = {};
        set['players.' + i + '.name'] = val;

        Matches.update(matchId, {$set: set});
      }
    });
  },

  'click .player-remove': function(e, tmpl) {
    var _id = e.currentTarget.getAttribute('data-id');

    var matchId = Router.current().params._id;
    var match = Matches.findOne(matchId);

    Matches.update(matchId, {$set: {'players': match.players.filter(function(player) { return _id !== player._id; })}});
  }
});

Template.play.isOwner = function() {
  var matchId = Router.current().params._id;
  var match = Matches.findOne(matchId);

  return match.owner === Meteor.userId();
};

Template.play.canEdit = function() {
  var matchId = Router.current().params._id;
  var match = Matches.findOne(matchId);

  return Template.play.isOwner() && ! match.retired;
};
Template.textbox.canEdit = Template.play.canEdit;

Template.textbox.rendered = function(tmpl) {
  function findCircleMatches(q, cb) {
    var strs = Circles.find({ user: Meteor.userId() }).fetch().map(function(x) {
      return x.displayName;
    });
    strs.push(Meteor.user().profile.name);

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
