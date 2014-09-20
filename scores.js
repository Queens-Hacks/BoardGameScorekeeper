Games = new Meteor.Collection('games');

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
  this.route('play_game', {
    path: '/play_game/:_name',
    data: function () {
      var players = ['Graham', 'Carey', 'Michael'],
        scoreItems = ['Settlements', 'Cities'];

      return {
        game: {
          bgglink: 'http://boardgamegeek.com/boardgame/13/settlers-catan',
          name: 'Settlers of Catan'
        },
        players: players,
        scoreItems: scoreItems
      };
    }
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
}
