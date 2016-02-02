var Unit = function (level, tileX, tileY) {
    this.level = level;
    this.tile = {
        x: tileX,
        y: tileY
    };

    this.moveableHexes = new Hashtable();

    this.init();

    var world = this.level.getWorldCoordinates(this.tile.x, this.tile.y);

    Phaser.Sprite.call(this, game, world.x, world.y, this.spriteReference);

    this.createHitpointOverlay();

    this.highlight = game.add.sprite(0, 0, this.spriteReference);
    this.highlight.tint = 0x00ff00;
    this.highlight.alpha = 0.2;
    this.highlight.visible = false;
    this.addChild(this.highlight);

    this.selectEvent = new Phaser.Signal();
    this.selectEvent.add(this.showMoveableHexes, this);
    if(DEBUG)
        this.selectEvent.add(function() { console.log('selectEvent', this)}, this);

    this.deselectEvent = new Phaser.Signal();
    if(DEBUG)
        this.deselectEvent.add(function() { console.log('deselectEvent', this)}, this);

    this.startMoveEvent = new Phaser.Signal();
    if(DEBUG)
        this.startMoveEvent.add(function() { console.log('startMoveEvent', this)}, this);

    this.finishMoveEvent = new Phaser.Signal();
    if(DEBUG)
        this.finishMoveEvent.add(function() { console.log('finishMoveEvent', this)}, this);

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

Unit.prototype.showMoveableHexes = function() {
    var self = this;
    var start = this.level.hex[this.tile.x][this.tile.y];
    var frontier = new Hashtable();
    frontier.put(start, 0);
    var cameFrom = new Hashtable();
    this.moveableHexes = new Hashtable();
    cameFrom.put(start, 0);
    this.moveableHexes.put(start, 0);

    while (frontier.size() > 0) {
        var current = frontier.entries()[0][0];
        frontier.remove(current);
        var neighbours = current.getAdjacentHexes();
        neighbours.forEach( function(next) {
            if(next.isMoveable()) {
                var newCost = self.moveableHexes.get(current) + next.terrain.movementCost;
                if(newCost <= self.movement) {
                    if( ! self.moveableHexes.containsKey(next) || newCost < self.moveableHexes.get(next)) {
                        self.moveableHexes.put(next, newCost);
                        frontier.put(next, newCost);
                        cameFrom.put(next, current);
                    }
                }
            }
        });
    }

    this.moveableHexes.remove(start);

    this.moveableHexes.entries().forEach( function(entry) {
        var hex = entry[0];
        var cost = entry[1];
        hex.showMoveable(cost);
        self.deselectEvent.add(hex.hideMoveable, hex);
        self.finishMoveEvent.add(hex.hideMoveable, hex);
    });

};

Unit.prototype.select = function() {
    this.level.selectedUnit = this;
    this.highlight.visible = true;

    this.selectEvent.dispatch(this);
};

Unit.prototype.deselect = function() {
    this.level.selectedUnit = null;
    this.highlight.visible = false;

    this.deselectEvent.dispatch(this);
};

Unit.prototype.moveTo = function(hex) {
    this.startMoveEvent.dispatch(this);
    this.level.hex[this.tile.x][this.tile.y].removeUnit();
    this.tile = hex.tile;
    this.x = hex.x;
    this.y = hex.y;
    hex.setUnit(this);
    this.finishMoveEvent.dispatch(this);
};

Unit.prototype.canMoveTo = function(hex) {
  return this.moveableHexes.containsKey(hex);
};