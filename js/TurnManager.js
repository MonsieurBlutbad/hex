/**
 * Created by BK on 11.02.16.
 */
var TurnManager = function(level) {
    this.level = level;

    this.nextRoundEvent = new Phaser.Signal();
    this.nextRoundEvent.add( this.nextRoundListener, this, 9);

    this.beginRoundEvent = new Phaser.Signal();
    this.beginRoundEvent.add( this.beginRoundListener, this, 9);

    this.endRoundEvent = new Phaser.Signal();
    this.endRoundEvent.add( this.endRoundListener, this, 9);

    this.nextTurnEvent = new Phaser.Signal();
    this.nextTurnEvent.add( this.nextTurnListener, this, 9);

    this.beginTurnEvent = new Phaser.Signal();
    this.beginTurnEvent.add( this.beginTurnListener, this, 9 );

    this.endTurnEvent = new Phaser.Signal();
    this.endTurnEvent.add( this.endTurnListener, this, 9);
};

TurnManager.prototype = {

    nextRoundListener: function() {
        if(DEBUG)
            console.log('nextRoundListener', this);
        this.endRoundEvent.dispatch();
        this.beginRoundEvent.dispatch();
    },

    endRoundListener: function() {
        if(DEBUG)
            console.log('endRoundListener', this);
    },

    beginRoundListener: function() {
        if(DEBUG)
            console.log('beginRoundListener', this);
        this.level.round ++;
    },

    nextTurnListener: function() {
        if(DEBUG)
            console.log('nextTurnListener', this);
        this.endTurnEvent.dispatch();
        this.beginTurnEvent.dispatch();
    },

    endTurnListener: function(level) {
        if(DEBUG)
            console.log('endTurnListener', this);
        this.level.selectedHex.deselect();
    },

    beginTurnListener: function() {
        if(DEBUG)
            console.log('beginTurnListener', this);

        var index = this.level.sides.indexOf(this.level.currentSide) + 1;
        this.level.currentSide = this.level.sides[index % this.level.sides.length];
        if(index >= this.level.sides.length) {
            this.nextRoundEvent.dispatch();
        }
    },

};