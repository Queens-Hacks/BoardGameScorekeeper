function getCircles(user) {
  // Get all of the circles
  try {
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

    console.log('Successfully retrieved Circles:', people.length);

    Circles.remove({ user: user._id });
    people.forEach(function(person) {
      person.user = user._id;
      Circles.insert(person);
    });
  } catch(e) {
    console.error('Error while getting Circles:', e);
  }
}

Accounts.onCreateUser(function(options, user) {
  getCircles(user);
  return user;
});

Accounts.onLogin(function(options) {
  getCircles(options.user);
});
