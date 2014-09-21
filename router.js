if (Meteor.isClient) {
  Router.onBeforeAction('dataNotFound');
}

// Yeah, we need to do this...
RegExp.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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
          active: Matches.find({
            players: {
              $elemMatch: {
                name: Meteor.user().profile.name
              }
            },
            retired: {$not: true}
          }),
          inactive: Matches.find({
            players: {
              $elemMatch: {
                name: Meteor.user().profile.name
              }
            }, retired: true })
        };
      }
      return {};
    }
  });

  this.route('search', {
    data: function() {
      return {
        results: Games.find({ name: {
          $regex: RegExp.escape(Session.get('searchQuery')), $options: 'i'
        }})
      };
    }
  });
  this.route('play', {
    path: '/play/:_id',
    data: function() { return Matches.findOne({ _id: this.params._id }); }
  });
});
