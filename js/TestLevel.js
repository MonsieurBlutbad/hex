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
    this.terrainGroup.zIndex = 0;
    for (var tileY = 0; tileY < this.grid.y; tileY ++) {
        for (var tileX = 0; tileX < this.grid.x; tileX ++) {
            var terrain = this.terrainFactory.createGrass(tileX, tileY);
            this.terrainGroup.add(terrain);
            this.hex[tileX][tileY].terrain = terrain;
        }
    }
};

level.createUnits = function() {
    this.unitGroup.zIndex = 2;
    var panther = this.unitFactory.createPanther(3, 3);
    this.unitGroup.add(panther);
    this.hex[3][3].unit = panther;
};

