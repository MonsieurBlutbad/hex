/**
 * Created by Kay on 29.01.2016.
 */

var TerrainFactory = function(level) {
    Factory.call(this, level);
};

TerrainFactory.prototype = new Factory();

TerrainFactory.prototype.createTerrain = function (tileX, tileY, spriteReference) {
    return this.createAtTile(tileX, tileY, spriteReference);
};

TerrainFactory.prototype.createGrass = function (tileX, tileY) {
    var grass = this.createTerrain(tileX, tileY, 'grass');
    grass.name = 'Grass';
    grass.movementCost = 5;
    return grass;
};