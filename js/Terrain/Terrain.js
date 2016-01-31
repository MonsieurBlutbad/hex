var Terrain = function (level, tileX, tileY) {
    this.level = level;

    this.tile = {
        x: tileX,
        y: tileY
    }

    this.init();

    var world = this.level.getWorldCoordinates(this.tile.x, this.tile.y);

    Phaser.Sprite.call(this, game, world.x, world.y, this.spriteReference);
};

Terrain.prototype = Object.create(Phaser.Sprite.prototype);

Terrain.prototype.init = function() {
    this.name = 'Terrain';
    this.spriteReference = null;
    this.movementCost = 0;
};