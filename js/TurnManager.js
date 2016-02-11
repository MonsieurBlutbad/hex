/**
 * Created by BK on 11.02.16.
 */
var TurnManager = function(level) {
    this.level = level;

    this.beginRoundEvent = new Phaser.Signal();
    this.beginRoundEvent.add( this.beginRoundListener, this);

    this.endRoundEvent = new Phaser.Signal();
    this.endRoundEvent.add( this.endRoundListener, this);

    this.beginTurnEvent = new Phaser.Signal();
    this.beginTurnEvent.add( this.beginTurnListener, this );

    this.endTurnEvent = new Phaser.Signal();
    this.endTurnEvent.add( this.endTurnListener, this);
};

TurnManager.prototype = {

    beginRoundListener: function(level) {
        if(DEBUG)
            console.log('beginRoundListener', level);
        level.round ++;
    },

    endRoundListener: function(level) {
        if(DEBUG)
            console.log('endRoundListener', level);
        level.turnManager.beginRoundEvent.dispatch(level);
    },

    beginTurnListener: function(level) {
        if(DEBUG)
            console.log('beginTurnEvent', level);

        var index = level.sides.indexOf(level.currentSide) + 1;
        level.currentSide = level.sides[index % level.sides.length];
        if(index >= level.sides.length) {
            level.turnManager.endRoundEvent.dispatch(level);
        }

    },

    endTurnListener: function(level) {
        if(DEBUG)
            console.log('endTurnEvent', level);
        this.beginTurnEvent.dispatch(level);
    }

};