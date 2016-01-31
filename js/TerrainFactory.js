/**
 * Created by Kay on 29.01.2016.
 */

var TerrainFactory = function(level) {
    if(! level instanceof Level)
        console.log('Bad Argument. Expected Level, got' + level, this);
    Factory.call(this, level);
};

TerrainFactory.prototype = new Factory();

TerrainFactory.prototype.createTerrain = function (tileX, tileY, spriteReference) {
    var terrain = this.createAtTile(tileX, tileY, spriteReference);
    var points = [];

    for (var i = 0; i < 6; i++) {
        points[i] = {
            x: (terrain.width/2) + (terrain.width/2) * Math.sin((2*Math.PI/6*i) + (2*Math.PI/12)),
            y: (terrain.height/2) + (terrain.width/2) * Math.cos((2*Math.PI/6*i) + (2*Math.PI/12))
        };
    }
    terrain.hitArea = new Phaser.Polygon(points);
    terrain.inputEnabled = true;

    terrain.events.onInputDown.add(this.level.hexClicked, this.level);

    terrain.events.onInputOver.add(this.level.hexHovered, this.level);

    terrain.events.onInputOut.add(this.level.hexLeft, this.level);

    if(DEBUG) {
        var style = { font: "12px Courier", fill: "#000000", align: "center" };
        var text = game.add.text(20, 10, tileX + ',' + tileY, style);
        terrain.addChild(text);
    }

    return terrain;
};

TerrainFactory.prototype.createGrass = function (tileX, tileY) {
    var grass = this.createTerrain(tileX, tileY, 'grass');
    grass.name = 'Grass';
    grass.movementCost = 5;
    return grass;
};