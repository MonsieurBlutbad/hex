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

    this.events.onInputDown.add(this.level.hexClicked, this.level);

    this.events.onInputOver.add(this.level.hexHovered, this.level);

    this.events.onInputOut.add(this.level.hexLeft, this.level);

    this.highlightGroup = game.add.group();

    this.highlight = game.add.graphics(0, 0);
    this.highlight.beginFill(0xffffff, 1);
    this.highlight.drawPolygon(geometry.points);
    this.highlight.endFill();
    this.highlight.alpha = 0.2;
    this.highlight.visible = false;
    this.highlightGroup.add(this.highlight);

    this.moveableHex = game.add.graphics(0,0);
    this.moveableHex.lineStyle(0);
    this.moveableHex.beginFill(0x333333, 1);
    this.moveableHex.drawCircle(this.width / 2, this.height / 2, this.width / 8);
    this.moveableHex.endFill();
    this.moveableHex.visible = false;
    this.highlightGroup.add(this.moveableHex);

    this.addChild(this.highlightGroup);

    if(DEBUG) {
        var style = { font: "12px Courier", fill: "#fff", align: "center" };
        var text = game.add.text(20, 10, this.tile.x + ',' + this.tile.y, style);
        this.addChild(text);
    }

    if(DEBUG) {
        var style = { font: "16px Courier", fill: "#bbf", align: "center" };
        this.debugPathfinder = game.add.text(20, 40, '', style);
        this.addChild(this.debugPathfinder);
    }

    game.add.existing(this);
};

Hex.prototype = Object.create(Phaser.Graphics.prototype);

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

Hex.prototype.setHighlight = function(bool) {
    this.highlightGroup.setAll('visible', bool);
}