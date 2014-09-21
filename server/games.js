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
