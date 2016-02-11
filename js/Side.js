/**
 * Created by BK on 04.02.16.
 */
var Side = function(level, name, type) {

    if(!level || !name || !type)
        console.log('Warning: illegal arguments', this, arguments);

    this.level = level;
    this.name = name;
    this.type = type;

    var self = this;

    level.turnManager.beginTurnEvent.add( function() {
        if(self.level.currentSide === self)
            self.beginTurnEvent.dispatch(self);
    });

    level.turnManager.endTurnEvent.add( function() {
        if(self.level.currentSide === self)
            self.endTurnEvent.dispatch(self);
    });

    this.beginTurnEvent = new Phaser.Signal();
    this.beginTurnEvent.add( this.beginTurnListener);

    this.endTurnEvent = new Phaser.Signal();
    this.endTurnEvent.add( this.endTurnListener);
};

Side.prototype = {

    beginTurnListener: function(side) {
        if(DEBUG)
            console.log('Side beginTurnEvent', side);
    },

    endTurnListener: function(side) {
        if(DEBUG)
            console.log('Side endTurnEvent', side);
    }

};