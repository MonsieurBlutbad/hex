var Unit =function (level, tileX, tileY) {
    this.level = level;
    this.tile = {
        x: tileX,
        y: tileY
    }

    this.init();

    var world = this.level.getWorldCoordinates(this.tile.x, this.tile.y);

    Phaser.Sprite.call(this, game, world.x, world.y, this.spriteReference);

    this.createHitpointOverlay();
};

Unit.prototype = Object.create(Phaser.Sprite.prototype);

Unit.prototype.init = function() {
    this.name = 'Unit';
    this.spriteReference = 'unit';
    this.movement = 0;
    this.attack = 0;
    this.defense = 0;
    this.maxHitpoints = 0;
    this.hitpoints = 0;
    this.xp = 0;
};

Unit.prototype.createHitpointOverlay = function() {
    var overlayWidth = 20;
    var overlayHeight = 14;

    this.hitpointDisplay = game.add.group();

    // draw background
    var background = new Phaser.Graphics(game, this.width/2 - overlayWidth/2, this.height * 0.66);
    background.beginFill(0x222222);
    background.drawRect(0, 0, overlayWidth, overlayHeight);
    background.endFill();
    // add text
    var style = { font: '12px Courier', fill: '#ccc'};
    this.hitpointText = game.add.text( 2, 0, this.hitpoints, style);
    this.hitpointText.anchor.setTo(0,0);
    background.addChild(this.hitpointText);

    this.hitpointDisplay.add(background);

    this.addChild(this.hitpointDisplay);
};

Unit.prototype.applyDamage = function(amount) {
    this.hitpoints = Math.max(0, amount);
    this.updateHitpointOverlay();
};

Unit.prototype.heal = function(amount) {
    this.hitpoints = Math.min(this.maxHitpoints, amount);
    this.updateHitpointOverlay();
};

Unit.prototype.updateHitpointOverlay = function() {
    this.hitpointText.setText(this.hitpoints)
};

Unit.prototype.moveTo = function(hex) {
    // TODO checks if movement possible
    this.level.hex[this.tile.x][this.tile.y].removeUnit();

    this.tile = {
        x: hex.tile.x,
        y: hex.tile.y
    };

    var world = this.level.getWorldCoordinates(this.tile.x, this.tile.y);
    this.x = world.x;
    this.y = world.y;

    this.level.hex[this.tile.x][this.tile.y].setUnit(this);
};