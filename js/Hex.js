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

    if(DEBUG) {
        var style = { font: "12px Courier", fill: "#000000", align: "center" };
        var text = game.add.text(20, 10, this.tile.x + ',' + this.tile.y, style);
        this.addChild(text);
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
