Session.setDefault('searchQuery', '');


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


