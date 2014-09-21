UI.registerHelper('winner', function(players) {
  return players.reduce(function(m, x) {
    return (x.name && x.score > m.score) ? x : m;
  }, {score: -Infinity});
});
