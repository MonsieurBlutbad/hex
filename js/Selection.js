/**
 * Created by BK on 12.02.16.
 */
var Selection = function(level) {
    this.level = level;

    this.hex;

    this.level.turnManager.endTurnEvent.add(this.endTurnListener, this);

    this.changeEvent = new Phaser.Signal();
};

Selection.prototype = {

    /**
     * Listens for end of turn.
     */
    endTurnListener: function() {
        this.deselect();
    },

    select: function(hex) {

    },

    /**
     * Deselects the currently selected hex.
     */
    deselect: function() {
        if(this.hex) {

            if(this.hex.unit)
                this.hex.unit.deselect();

            this.hex.deselect();

            this.hex = null;
        }

        this.changeEvent.dispatch(this);
    },
};