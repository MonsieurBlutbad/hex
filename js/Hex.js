var Hex = function (level, tileX, tileY) {
    this.level = level;
    this.terrain = null;
    this.unit = null;
    this.tile = {
        x: tileX,
        y: tileY
    };

    var world = this.level.getWorldCoordinates(this.tile.x, this.tile.y);

    Phaser.Graphics.call(this, game, world.x, world.y);

    var points = [];

    for (var i = 0; i < 6; i++) {
          points[i] = {
              x: (HEX_WIDTH/2) + (HEX_WIDTH/2) * Math.sin((2*Math.PI/6*i) + (2*Math.PI/12)),
              y: (HEX_HEIGHT/2) + (HEX_WIDTH/2) * Math.cos((2*Math.PI/6*i) + (2*Math.PI/12))
          };
    }

    var geometry = new Phaser.Polygon(points);
    this.lineStyle(1, '0xffffff', 0.5);
    this.drawPolygon(geometry.points);

    this.hitArea = geometry;

    this.inputEnabled = true;

    if(DEBUG)
        this.events.onInputDown.add(function() { console.log('onInputDown', this)}, this);
    this.events.onInputDown.add(this.mousedown, this);

    this.events.onInputOver.add(this.mouseover, this);
    this.events.onInputOut.add(this.mouseout, this);

    this.createMoveableMarker(geometry);

    this.hoveredMarker = game.add.sprite(0,0,'mouseOverHex');
    this.hoveredMarker.visible=false;
    this.addChild(this.hoveredMarker);

    this.selectedMarker = game.add.sprite(0,0,'selectedHex');
    this.selectedMarker.visible=false;
    this.addChild(this.selectedMarker);

    if(DEBUG) {
        var style = { font: "12px Courier", fill: "#fff", align: "center" };
        var text = game.add.text(20, 10, this.tile.x + ',' + this.tile.y, style);
        this.addChild(text);
    }

    game.add.existing(this);
};


Hex.prototype = Object.create(Phaser.Graphics.prototype);


Hex.prototype.createMoveableMarker = function(geometry) {
    this.moveableMarkerGroup = game.add.group();

    var background = game.add.graphics(0, 0);
    background.beginFill(0xffffff, 1);
    background.drawPolygon(geometry.points);
    background.endFill();
    background.alpha = 0.2;
    background.visible = false;
    this.moveableMarkerGroup.add(background);

    var dot = game.add.graphics(0,0);
    dot.lineStyle(0);
    dot.beginFill(0x333333, 1);
    dot.drawCircle(this.width / 2, this.height / 2, this.width / 8);
    dot.endFill();
    dot.visible = false;
    this.moveableMarkerGroup.add(dot);

    if(DEBUG) {
        var style = { font: "16px Courier", fill: "#bbf", align: "center" };
        this.debugPathfinder = game.add.text(20, 40, '', style);
        this.debugPathfinder.visible = false;
        this.moveableMarkerGroup.addChild(this.debugPathfinder);
    }

    this.addChild(this.moveableMarkerGroup);

};


Hex.prototype.setTerrain = function(terrain) {
    this.terrain = terrain;
};


Hex.prototype.getTerrain = function() {
    return this.terrain;
};


Hex.prototype.setUnit = function(unit) {
    this.unit = unit;
};


Hex.prototype.getUnit = function() {
    return this.unit;
};


Hex.prototype.hasUnit = function() {
    // todo instanceof Unit
    return this.unit !== undefined && this.unit !== null;
};


Hex.prototype.removeUnit = function() {
    this.unit = null;
};


Hex.prototype.getAdjacentHexes = function() {

    var adjacentHexes = [];

    var even = this.tile.x % 2 !== 0;

    var relativeTiles = [
        [-1, even? 0 : -1],
        [-1, even? 1 : 0],
        [0, -1],
        [0, 1],
        [1, even? 0 : -1],
        [1, even? 1 : 0]
    ];

    for(var i = 0; i < relativeTiles.length; i++) {
        var tileX = this.tile.x + relativeTiles[i][0];
        var tileY = this.tile.y + relativeTiles[i][1];
        if(tileX >= 0 && tileX < this.level.grid.width && tileY >= 0 && tileY < this.level.grid.height)
            adjacentHexes.push(this.level.hex[tileX][tileY]);
    }

    return adjacentHexes;
};


Hex.prototype.isMoveable = function() {
    return ! this.hasUnit();
};


Hex.prototype.showMoveable = function(cost) {
    this.moveableMarkerGroup.setAll('visible', true);
    if(DEBUG) {
        this.debugPathfinder.setText(cost);
    }
};


Hex.prototype.hideMoveable = function() {
    this.moveableMarkerGroup.setAll('visible', false);
};

/**
 * Called on mouse over event.
 */
Hex.prototype.mouseover = function() {
    this.hoveredMarker.visible = true;
};

/**
 * Called on mouse out event.
 */
Hex.prototype.mouseout = function() {
    this.hoveredMarker.visible = false;
};

/**
 * Called on mouse down event.
 */
Hex.prototype.mousedown = function() {
    if(this.level.selection.hex === this) {
        this.deselect();
    } else {
        this.select();
    }
};

/**
 * Selects this hex.
 */
Hex.prototype.select = function() {
    if(this.level.selection.hex)
        this.level.selection.hex.selectedMarker.visible = false;
    if(this.hasUnit()) {
        if(this.level.selection.hex && this.level.selection.hex.unit)
            this.level.selection.hex.unit.deselect();
        this.getUnit().select();
    }
    else if(this.level.selection.hex && this.level.selection.hex.unit) {
        var unit = this.level.selection.hex.unit;
        if(unit.canMoveTo(this))
           unit.moveTo(this);
        else
            unit.deselect();
    }

    this.level.selection.hex = this;
    this.selectedMarker.visible = true;

    this.level.selection.changeEvent.dispatch(this);
};

/**
 * Deselects this hex.
 */
Hex.prototype.deselect = function() {
    this.selectedMarker.visible = false;
};