/**
 * Created by Kay on 29.01.2016.
 */

var UnitFactory = function(level) {
    if(! level instanceof Level)
        console.log('Bad Argument. Expected Level, got' + level, this);

    Factory.call(this, level);
};

UnitFactory.prototype = new Factory();

UnitFactory.prototype.createUnit = function (tileX, tileY, spriteReference) {
    return this.createAtTile(tileX, tileY, spriteReference);
};

UnitFactory.prototype.createPanther = function (tileX, tileY) {
    var panther = this.createUnit(tileX, tileY, 'panther');
    panther.attack = 10;
    panther.defense = 3;
    panther.movement = 20;
    panther.type = 'tank';
};