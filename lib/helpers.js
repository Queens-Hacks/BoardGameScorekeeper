UI.registerHelper('gt', function (c1, c2) {
  return (c1 > c2);
});
UI.registerHelper('lt', function (c1, c2) {
  return (c1 < c2);
});
UI.registerHelper('eq', function (c1, c2) {
  return (c1 === c2);
});
UI.registerHelper('filterPlayerArray', function (array) {
  var newArray = [];
  array.forEach(function(player){
    if (player.name){
      newArray.push(player);
    }
  });

  return newArray;
});
