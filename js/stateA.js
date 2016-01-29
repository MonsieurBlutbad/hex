var States = {};

States.Test = function (game) {
    Level.call(this, game);
};

States.Test.prototype = new Level();

var level = States.Test.prototype;

level.init = function () {
    this.map = {
        x: 20,
        y: 15
    };
    this.terrainFactory = new TerrainFactory(this);
    this.unitFactory = new UnitFactory(this);
};

level.loadAssets = function () {
    game.load.image('grass', 'sprites/grass.png');
    game.load.image('panther', 'sprites/panther.png');
};

level.createTerrain = function() {
    hexagonGroup = game.add.group();

    for (var tileY = 0; tileY < gridSizeY; tileY ++) {
        for (var tileX = 0; tileX < gridSizeX; tileX ++) {
            var terrain = this.terrainFactory.createGrass(tileX, tileY);
            hexagonGroup.add(terrain);
        }
    }
};

level.createUnits = function() {
    panther = this.unitFactory.createPanther(3, 3);
};

