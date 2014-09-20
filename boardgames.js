BoardGames = new Meteor.Collection('boardGames');

var gameFixtures = [
  {
    "name": "Twilight Struggle",
    "thumbnail": "http://cf.geekdo-images.com/images/pic361592_mt.jpg",
    "bgg_id": "12333"
  },
  {
    "name": "Through the Ages: A Story of Civilization",
    "thumbnail": "http://cf.geekdo-images.com/images/pic236169_mt.jpg",
    "bgg_id": "25613"
  },
  {
    "name": "Terra Mystica",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1356616_mt.jpg",
    "bgg_id": "120677"
  },
  {
    "name": "Agricola",
    "thumbnail": "http://cf.geekdo-images.com/images/pic259085_mt.jpg",
    "bgg_id": "31260"
  },
  {
    "name": "Puerto Rico",
    "thumbnail": "http://cf.geekdo-images.com/images/pic158548_mt.jpg",
    "bgg_id": "3076"
  },
  {
    "name": "Android: Netrunner",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1324609_mt.jpg",
    "bgg_id": "124742"
  },
  {
    "name": "Caverna: The Cave Farmers",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1790789_mt.jpg",
    "bgg_id": "102794"
  },
  {
    "name": "Eclipse",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1173341_mt.jpg",
    "bgg_id": "72125"
  },
  {
    "name": "Mage Knight Board Game",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1083380_mt.jpg",
    "bgg_id": "96848"
  },
  {
    "name": "Power Grid",
    "thumbnail": "http://cf.geekdo-images.com/images/pic173153_mt.jpg",
    "bgg_id": "2651"
  },
  {
    "name": "The Castles of Burgundy",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1176894_mt.jpg",
    "bgg_id": "84876"
  },
  {
    "name": "Le Havre",
    "thumbnail": "http://cf.geekdo-images.com/images/pic447994_mt.jpg",
    "bgg_id": "35677"
  },
  {
    "name": "Robinson Crusoe: Adventure on the Cursed Island",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1413154_mt.jpg",
    "bgg_id": "121921"
  },
  {
    "name": "Brass",
    "thumbnail": "http://cf.geekdo-images.com/images/pic261878_mt.jpg",
    "bgg_id": "28720"
  },
  {
    "name": "Tzolk'in: The Mayan Calendar",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1413480_mt.jpg",
    "bgg_id": "126163"
  },
  {
    "name": "War of the Ring (second edition)",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1215633_mt.jpg",
    "bgg_id": "115746"
  },
  {
    "name": "Caylus",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1638795_mt.jpg",
    "bgg_id": "18602"
  },
  {
    "name": "7 Wonders",
    "thumbnail": "http://cf.geekdo-images.com/images/pic860217_mt.jpg",
    "bgg_id": "68448"
  },
  {
    "name": "Dominion: Intrigue",
    "thumbnail": "http://cf.geekdo-images.com/images/pic460011_mt.jpg",
    "bgg_id": "40834"
  },
  {
    "name": "Dominant Species",
    "thumbnail": "http://cf.geekdo-images.com/images/pic784193_mt.jpg",
    "bgg_id": "62219"
  },
  {
    "name": "Star Wars: X-Wing Miniatures Game",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1603292_mt.jpg",
    "bgg_id": "103885"
  },
  {
    "name": "El Grande",
    "thumbnail": "http://cf.geekdo-images.com/images/pic180538_mt.jpg",
    "bgg_id": "93"
  },
  {
    "name": "Dominion",
    "thumbnail": "http://cf.geekdo-images.com/images/pic394356_mt.jpg",
    "bgg_id": "36218"
  },
  {
    "name": "Race for the Galaxy",
    "thumbnail": "http://cf.geekdo-images.com/images/pic236327_mt.jpg",
    "bgg_id": "28143"
  },
  {
    "name": "Battlestar Galactica",
    "thumbnail": "http://cf.geekdo-images.com/images/pic354500_mt.jpg",
    "bgg_id": "37111"
  },
  {
    "name": "Mage Wars",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1654280_mt.jpg",
    "bgg_id": "101721"
  },
  {
    "name": "Lords of Waterdeep",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1116080_mt.jpg",
    "bgg_id": "110327"
  },
  {
    "name": "The Resistance: Avalon",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1398895_mt.jpg",
    "bgg_id": "128882"
  },
  {
    "name": "Twilight Imperium (Third Edition)",
    "thumbnail": "http://cf.geekdo-images.com/images/pic50404_mt.jpg",
    "bgg_id": "12493"
  },
  {
    "name": "Tigris &amp; Euphrates",
    "thumbnail": "http://cf.geekdo-images.com/images/pic168169_mt.jpg",
    "bgg_id": "42"
  },
  {
    "name": "Eldritch Horror",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1872452_mt.jpg",
    "bgg_id": "146021"
  },
  {
    "name": "War of the Ring (first edition)",
    "thumbnail": "http://cf.geekdo-images.com/images/pic725882_mt.jpg",
    "bgg_id": "9609"
  },
  {
    "name": "Descent: Journeys in the Dark (Second Edition)",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1180640_mt.jpg",
    "bgg_id": "104162"
  },
  {
    "name": "A Game of Thrones: The Board Game (Second Edition)",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1077906_mt.jpg",
    "bgg_id": "103343"
  },
  {
    "name": "Keyflower",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1500659_mt.png",
    "bgg_id": "122515"
  },
  {
    "name": "Ora et Labora",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1165426_mt.jpg",
    "bgg_id": "70149"
  },
  {
    "name": "Trajan",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1054375_mt.jpg",
    "bgg_id": "102680"
  },
  {
    "name": "Crokinole",
    "thumbnail": "http://cf.geekdo-images.com/images/pic79413_mt.jpg",
    "bgg_id": "521"
  },
  {
    "name": "Nations",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1591406_mt.png",
    "bgg_id": "126042"
  },
  {
    "name": "Commands &amp; Colors: Ancients",
    "thumbnail": "http://cf.geekdo-images.com/images/pic132447_mt.jpg",
    "bgg_id": "14105"
  },
  {
    "name": "Paths of Glory",
    "thumbnail": "http://cf.geekdo-images.com/images/pic834645_mt.jpg",
    "bgg_id": "91"
  },
  {
    "name": "Steam",
    "thumbnail": "http://cf.geekdo-images.com/images/pic392515_mt.jpg",
    "bgg_id": "27833"
  },
  {
    "name": "Pandemic",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1534148_mt.jpg",
    "bgg_id": "30549"
  },
  {
    "name": "Stone Age",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1632539_mt.jpg",
    "bgg_id": "34635"
  },
  {
    "name": "Russian Railroads",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1772936_mt.jpg",
    "bgg_id": "144733"
  },
  {
    "name": "Goa",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1215969_mt.jpg",
    "bgg_id": "9216"
  },
  {
    "name": "Combat Commander: Europe",
    "thumbnail": "http://cf.geekdo-images.com/images/pic992459_mt.jpg",
    "bgg_id": "21050"
  },
  {
    "name": "Troyes",
    "thumbnail": "http://cf.geekdo-images.com/images/pic750583_mt.jpg",
    "bgg_id": "73439"
  },
  {
    "name": "Age of Steam",
    "thumbnail": "http://cf.geekdo-images.com/images/pic429576_mt.jpg",
    "bgg_id": "4098"
  },
  {
    "name": "Summoner Wars: Master Set",
    "thumbnail": "http://cf.geekdo-images.com/images/pic923048_mt.jpg",
    "bgg_id": "93260"
  },
  {
    "name": "Railways of the World",
    "thumbnail": "http://cf.geekdo-images.com/images/pic445850_mt.jpg",
    "bgg_id": "17133"
  },
  {
    "name": "Suburbia",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1418335_mt.jpg",
    "bgg_id": "123260"
  },
  {
    "name": "The Princes of Florence",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1306997_mt.jpg",
    "bgg_id": "555"
  },
  {
    "name": "Chaos in the Old World",
    "thumbnail": "http://cf.geekdo-images.com/images/pic496014_mt.jpg",
    "bgg_id": "43111"
  },
  {
    "name": "Tichu",
    "thumbnail": "http://cf.geekdo-images.com/images/pic169494_mt.jpg",
    "bgg_id": "215"
  },
  {
    "name": "Hannibal: Rome vs. Carthage",
    "thumbnail": "http://cf.geekdo-images.com/images/pic706069_mt.jpg",
    "bgg_id": "234"
  },
  {
    "name": "Go",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1728832_mt.jpg",
    "bgg_id": "188"
  },
  {
    "name": "Pathfinder Adventure Card Game: Rise of the Runelords – Base Set",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1775517_mt.jpg",
    "bgg_id": "133038"
  },
  {
    "name": "Runewars",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1534815_mt.jpg",
    "bgg_id": "59294"
  },
  {
    "name": "Ticket to Ride: Europe",
    "thumbnail": "http://cf.geekdo-images.com/images/pic66668_mt.jpg",
    "bgg_id": "14996"
  },
  {
    "name": "Here I Stand",
    "thumbnail": "http://cf.geekdo-images.com/images/pic353047_mt.jpg",
    "bgg_id": "17392"
  },
  {
    "name": "Imperial",
    "thumbnail": "http://cf.geekdo-images.com/images/pic840712_mt.jpg",
    "bgg_id": "24181"
  },
  {
    "name": "Space Alert",
    "thumbnail": "http://cf.geekdo-images.com/images/pic384313_mt.jpg",
    "bgg_id": "38453"
  },
  {
    "name": "Age of Empires III: The Age of Discovery",
    "thumbnail": "http://cf.geekdo-images.com/images/pic990261_mt.jpg",
    "bgg_id": "22545"
  },
  {
    "name": "Village",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1115193_mt.jpg",
    "bgg_id": "104006"
  },
  {
    "name": "Hansa Teutonica",
    "thumbnail": "http://cf.geekdo-images.com/images/pic839090_mt.jpg",
    "bgg_id": "43015"
  },
  {
    "name": "Shogun",
    "thumbnail": "http://cf.geekdo-images.com/images/pic145843_mt.jpg",
    "bgg_id": "20551"
  },
  {
    "name": "The Lord of the Rings: The Card Game",
    "thumbnail": "http://cf.geekdo-images.com/images/pic906495_mt.jpg",
    "bgg_id": "77423"
  },
  {
    "name": "Ticket to Ride: Nordic Countries",
    "thumbnail": "http://cf.geekdo-images.com/images/pic369616_mt.jpg",
    "bgg_id": "31627"
  },
  {
    "name": "Sid Meier's Civilization: The Board Game",
    "thumbnail": "http://cf.geekdo-images.com/images/pic798666_mt.jpg",
    "bgg_id": "77130"
  },
  {
    "name": "Kemet",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1431241_mt.jpg",
    "bgg_id": "127023"
  },
  {
    "name": "Cosmic Encounter",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1521633_mt.jpg",
    "bgg_id": "39463"
  },
  {
    "name": "Lewis &amp; Clark",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1902092_mt.jpg",
    "bgg_id": "140620"
  },
  {
    "name": "Ticket to Ride",
    "thumbnail": "http://cf.geekdo-images.com/images/pic38668_mt.jpg",
    "bgg_id": "9209"
  },
  {
    "name": "Galaxy Trucker",
    "thumbnail": "http://cf.geekdo-images.com/images/pic486219_mt.jpg",
    "bgg_id": "31481"
  },
  {
    "name": "Die Macher",
    "thumbnail": "http://cf.geekdo-images.com/images/pic159509_mt.jpg",
    "bgg_id": "1"
  },
  {
    "name": "The Resistance",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1392135_mt.png",
    "bgg_id": "41114"
  },
  {
    "name": "Memoir '44",
    "thumbnail": "http://cf.geekdo-images.com/images/pic43663_mt.jpg",
    "bgg_id": "10630"
  },
  {
    "name": "Ra",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1603278_mt.jpg",
    "bgg_id": "12"
  },
  {
    "name": "Glory to Rome",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1079512_mt.png",
    "bgg_id": "19857"
  },
  {
    "name": "Imperial 2030",
    "thumbnail": "http://cf.geekdo-images.com/images/pic586346_mt.jpg",
    "bgg_id": "54138"
  },
  {
    "name": "Blood Bowl: Living Rulebook",
    "thumbnail": "http://cf.geekdo-images.com/images/pic66287_mt.jpg",
    "bgg_id": "15985"
  },
  {
    "name": "King of Tokyo",
    "thumbnail": "http://cf.geekdo-images.com/images/pic761434_mt.jpg",
    "bgg_id": "70323"
  },
  {
    "name": "Mice and Mystics",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1312072_mt.jpg",
    "bgg_id": "124708"
  },
  {
    "name": "Navegador",
    "thumbnail": "http://cf.geekdo-images.com/images/pic824016_mt.jpg",
    "bgg_id": "66589"
  },
  {
    "name": "Love Letter",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1401448_mt.jpg",
    "bgg_id": "129622"
  },
  {
    "name": "Claustrophobia",
    "thumbnail": "http://cf.geekdo-images.com/images/pic570518_mt.jpg",
    "bgg_id": "36932"
  },
  {
    "name": "YINSH",
    "thumbnail": "http://cf.geekdo-images.com/images/pic178413_mt.jpg",
    "bgg_id": "7854"
  },
  {
    "name": "Small World",
    "thumbnail": "http://cf.geekdo-images.com/images/pic428828_mt.jpg",
    "bgg_id": "40692"
  },
  {
    "name": "Bora Bora",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1542342_mt.jpg",
    "bgg_id": "127060"
  },
  {
    "name": "Alien Frontiers",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1657833_mt.jpg",
    "bgg_id": "48726"
  },
  {
    "name": "Earth Reborn",
    "thumbnail": "http://cf.geekdo-images.com/images/pic746581_mt.jpg",
    "bgg_id": "73171"
  },
  {
    "name": "1830: Railways &amp; Robber Barons",
    "thumbnail": "http://cf.geekdo-images.com/images/pic882119_mt.jpg",
    "bgg_id": "421"
  },
  {
    "name": "1960: The Making of the President",
    "thumbnail": "http://cf.geekdo-images.com/images/pic215664_mt.jpg",
    "bgg_id": "27708"
  },
  {
    "name": "Dungeon Petz",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1103979_mt.jpg",
    "bgg_id": "97207"
  },
  {
    "name": "Dungeon Lords",
    "thumbnail": "http://cf.geekdo-images.com/images/pic569340_mt.jpg",
    "bgg_id": "45315"
  },
  {
    "name": "Dixit Odyssey",
    "thumbnail": "http://cf.geekdo-images.com/images/pic918568_mt.jpg",
    "bgg_id": "92828"
  },
  {
    "name": "Sentinels of the Multiverse",
    "thumbnail": "http://cf.geekdo-images.com/images/pic1296144_mt.jpg",
    "bgg_id": "102652"
  },
  {
    "name": "Carcassonne",
    "thumbnail": "http://cf.geekdo-images.com/images/pic166867_mt.jpg",
    "bgg_id": "822"
  },
  {
    "name": "Advanced Squad Leader",
    "thumbnail": "http://cf.geekdo-images.com/images/pic771969_mt.jpg",
    "bgg_id": "243"
  }
];

if (Meteor.isServer) {
  BoardGames.remove({});

  gameFixtures.forEach(function(fixture) {
    fixture.thumbnail = fixture.thumbnail.replace(/_mt/, '');
    BoardGames.insert(fixture);
  });
}
