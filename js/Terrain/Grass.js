/**
 * Created by Kay on 31.01.2016.
 */

var Grass = function (level, tileX, tileY) {
    Terrain.apply(this, arguments);
};

Grass.prototype = Object.create(Terrain.prototype);

Grass.prototype.init = function() {
    this.name = 'Grass';
    this.spriteReference = 'grass';
    this.movementCost = 7;
};