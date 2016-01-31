var States = {};

States.Test = function (game) {
    Level.call(this, game);
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
    this.hexagonGroup = game.add.group();

    for (var tileY = 0; tileY < this.grid.y; tileY ++) {
        for (var tileX = 0; tileX < this.grid.x; tileX ++) {
            var terrain = this.terrainFactory.createGrass(tileX, tileY);
            this.hexagonGroup.add(terrain);
        }
    }
};

level.createUnits = function() {
    var panther = this.unitFactory.createPanther(3, 3);
};

