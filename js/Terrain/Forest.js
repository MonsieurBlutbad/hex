/**
 * Created by Kay on 31.01.2016.
 */

var Forest = function (level, tileX, tileY) {
    Terrain.apply(this, arguments);
};

Forest.prototype = Object.create(Terrain.prototype);

Forest.prototype.init = function() {
    this.name = 'Forest';
    this.spriteReference = 'forest';
    this.movementCost = 20;
};