/**
 * Created by Kay on 29.01.2016.
 */

var HexFactory = function(level) {
    Factory.call(this, level);
};

HexFactory.prototype = new Factory();

HexFactory.prototype.createHex = function (tileX, tileY) {
    var hex = this.createAtTile(tileX, tileY, 'hex');
    var points = [];

    for (var i = 0; i < 6; i++) {
        points[i] = {
            x: (hex.width/2) + (hex.width/2) * Math.sin((2*Math.PI/6*i) + (2*Math.PI/12)),
            y: (hex.height/2) + (hex.width/2) * Math.cos((2*Math.PI/6*i) + (2*Math.PI/12))
        };
    }
    hex.hitArea = new Phaser.Polygon(points);
    hex.inputEnabled = true;

    hex.events.onInputDown.add(this.level.hexClicked, this.level);

    hex.events.onInputOver.add(this.level.hexHovered, this.level);

    hex.events.onInputOut.add(this.level.hexLeft, this.level);

    if(DEBUG) {
        var style = { font: "12px Courier", fill: "#000000", align: "center" };
        var text = game.add.text(20, 10, tileX + ',' + tileY, style);
        hex.addChild(text);
    }

    return hex;
};