var Panther = function (level, tileX, tileY) {
    Unit.apply(this, arguments);
};

Panther.prototype = Object.create(Unit.prototype);

Panther.prototype.init = function() {
    this.name = 'Panther';
    this.spriteReference = 'panther';
    this.movement = 30;
    this.attack = 10;
    this.defense = 3;
    this.maxHitpoints = 12;
    this.hitpoints = 12;
    this.xp = 0;
};