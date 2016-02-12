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

    /**
     * Returns the currently selected unit.
     *
     * @returns {*}
     */
    getUnit: function() {
        if(this.hex)
            return this.hex.getUnit();
        return undefined;
    },

    /**
     * Selects the given hex.
     *
     * @param hex
     * @returns {*}
     */
    select: function(hex) {

        if(this.hex === hex)
            return this.deselect();

        var oldHex = this.hex;

        // Unit Movement
        if(this.getUnit()) {
            var unit = this.getUnit();
            if(unit.canMoveTo(hex))
                unit.moveTo(hex);
            else
                unit.deselect();
        }

        if(oldHex)
            oldHex.deselect();

        this.hex = hex;

        this.hex.select();

        this.changeEvent.dispatch(this);
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