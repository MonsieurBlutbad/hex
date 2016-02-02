/**
 * Created by Kay on 31.01.2016.
 */

var Dirt = function (level, tileX, tileY) {
    Terrain.apply(this, arguments);
};

Dirt.prototype = Object.create(Terrain.prototype);

Dirt.prototype.init = function() {
    this.name = 'Dirt';
    this.spriteReference = 'dirt';
    this.movementCost = 4;
};