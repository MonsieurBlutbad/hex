var Terrain = function (level, tileX, tileY) {
    this.level = level;

    this.init();

    var world = this.level.getWorldCoordinates(tileX, tileY);

    Phaser.Sprite.call(this, game, world.x, world.y, this.spriteReference);
};

Terrain.prototype = Object.create(Phaser.Sprite.prototype);

Terrain.prototype.init = function() {
    this.name = 'Terrain';
    this.spriteReference = null;
    this.movementCost = 0;
};

var Grass = function (level, tileX, tileY) {
    Terrain.apply(this, arguments);
};

Grass.prototype = Object.create(Terrain.prototype);

Grass.prototype.init = function() {
    this.name = 'Grass';
    this.spriteReference = 'grass';
    this.movementCost = 5;

};