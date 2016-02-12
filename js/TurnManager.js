/**
 * Created by BK on 11.02.16.
 */
var TurnManager = function(level) {
    this.level = level;
    this.round = 0;
    this.currentSide;

    this.initEvent = new Phaser.Signal();
    this.initEvent.add( this.init, this, 9);

    this.nextRoundEvent = new Phaser.Signal();
    this.nextRoundEvent.add( this.nextRound, this, 9);

    this.beginRoundEvent = new Phaser.Signal();
    this.beginRoundEvent.add( this.beginRound, this, 9);

    this.endRoundEvent = new Phaser.Signal();
    this.endRoundEvent.add( this.endRound, this, 9);

    this.nextTurnEvent = new Phaser.Signal();
    this.nextTurnEvent.add( this.nextTurn, this, 9);

    this.beginTurnEvent = new Phaser.Signal();
    this.beginTurnEvent.add( this.beginTurn, this, 9 );

    this.endTurnEvent = new Phaser.Signal();
    this.endTurnEvent.add( this.endTurn, this, 9);

};

TurnManager.prototype = {

    init: function () {
        this.round = 0;
        this.currentSide = this.level.sides[0];
    },

    nextRound: function() {
        if(DEBUG)
            console.log('nextRound', this);
        this.endRoundEvent.dispatch();
        this.beginRoundEvent.dispatch();
    },

    endRound: function() {
        if(DEBUG)
            console.log('endRound', this);
    },

    beginRound: function() {
        if(DEBUG)
            console.log('beginRound', this);
        this.round ++;
    },

    nextTurn: function() {
        if(DEBUG)
            console.log('nextTurn', this);
        this.endTurnEvent.dispatch();
        this.beginTurnEvent.dispatch();
    },

    endTurn: function(level) {
        if(DEBUG)
            console.log('endTurn', this);
    },

    beginTurn: function() {
        if(DEBUG)
            console.log('beginTurn', this);

        var index = this.level.sides.indexOf(this.currentSide) + 1;
        this.currentSide = this.level.sides[index % this.level.sides.length];
        if(index >= this.level.sides.length) {
            this.nextRoundEvent.dispatch();
        }
    },

};