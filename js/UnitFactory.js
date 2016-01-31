/**
 * Created by Kay on 29.01.2016.
 */

var UnitFactory = function(level) {
    Factory.call(this, level);
};

UnitFactory.prototype = new Factory();

UnitFactory.prototype.createUnit = function (tileX, tileY, spriteReference) {
    return this.createAtTile(tileX, tileY, spriteReference);
};

UnitFactory.prototype.createPanther = function (tileX, tileY) {
    var panther = this.createUnit(tileX, tileY, 'panther');
    panther.name = 'Panther'
    panther.attack = 10;
    panther.defense = 3;
    panther.movement = 20;
    panther.type = 'tank';

    return panther;
};