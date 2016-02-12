var States = {};

States.Test = function () {
    Level.call(this);
    this.grid = {
        width: 19,
        height: 15
    };
};

States.Test.prototype = new Level();

var level = States.Test.prototype;

level.initSides = function() {
  this.sides.push(
      new Side(this, 'Seite 1', 'HUMAN')
  );
  this.sides.push(
      new Side(this, 'Seite 2', 'HUMAN')
  );
};

level.loadAssets = function () {
    game.load.image('grass', 'sprites/grass.png');
    game.load.image('forest', 'sprites/forest.png');
    game.load.image('dirt', 'sprites/dirt.png');
    game.load.image('panther', 'sprites/panther.png');
};

level.createTerrain = function() {
    var terrainClasses = [Grass, Dirt, Forest];
    for (var tileY = 0; tileY < this.grid.height; tileY ++) {
        for (var tileX = 0; tileX < this.grid.width; tileX ++) {
            var randomValue = game.rnd.integerInRange(0, 2);
            var terrain = new terrainClasses[randomValue](this, tileX, tileY);
            this.terrainGroup.add(terrain);
            this.hex[tileX][tileY].setTerrain(terrain);
        }
    }
};

level.createUnits = function() {
    this.createUnit(Panther, this.sides[0], 3, 3);
    this.createUnit(Panther, this.sides[0], 2, 3);
    this.createUnit(Panther, this.sides[0], 1, 3);
    this.createUnit(Panther, this.sides[1], 7, 7);
    this.createUnit(Panther, this.sides[1], 9, 7);
    this.createUnit(Panther, this.sides[1], 7, 9);
};
