var States = {};

States.Test = function () {
    Level.call(this);
    this.grid = {
        x: 19,
        y: 15
    };
};

States.Test.prototype = new Level();

var level = States.Test.prototype;


level.loadAssets = function () {
    game.load.image('grass', 'sprites/grass.png');
    game.load.image('panther', 'sprites/panther.png');
};

level.createTerrain = function() {
    for (var tileY = 0; tileY < this.grid.y; tileY ++) {
        for (var tileX = 0; tileX < this.grid.x; tileX ++) {
            var terrain = new Grass(this, tileX, tileY);
            this.terrainGroup.add(terrain);
            this.hex[tileX][tileY].setTerrain(terrain);
        }
    }
};

level.createUnits = function() {
    var panther = new Panther(this, 3, 3);
    this.unitGroup.add(panther);
    this.hex[3][3].setUnit(panther);
};

