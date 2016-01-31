/**
 * Created by Kay on 31.01.2016.
 */
var Pathfinder = function(level) {
    if(! level instanceof Level)
        console.log('Bad Argument. Expected Level, got' + level, this);
    this.level = level;

};

Pathfinder.prototype = {

    getMoveableTiles: function(start, unit) {

    },

    getAdjacentTiles: function(start) {
        
    }

};