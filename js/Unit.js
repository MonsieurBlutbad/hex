var Unit =function (level, tileX, tileY) {
    this.level = level;

    this.init();

    var world = this.level.getWorldCoordinates(tileX, tileY);

    Phaser.Sprite.call(this, game, world.x, world.y, this.spriteReference);
};

Unit.prototype = Object.create(Phaser.Sprite.prototype);

Unit.prototype.init = function() {
    this.name = 'Unit';
    this.spriteReference = 'unit';
    this.movement = 0;
    this.attack = 0;
    this.defense = 0;
    this.hitpoints = 0;
    this.xp = 0;
};

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
    this.hitpoints = 12;
    this.xp = 0;
};