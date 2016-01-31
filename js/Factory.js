/**
 * Created by Kay on 29.01.2016.
 */

var Factory = function(level) {
    if(! level instanceof Level)
        console.log('Bad Argument. Expected Level, got' + level, this);
    this.level = level;
};

Factory.prototype = {

    createAtTile: function (tileX, tileY, spriteReference) {
        var world = this.level.getWorldCoordinates(tileX, tileY);
        return game.add.sprite(world.x, world.y, spriteReference);
    }
};