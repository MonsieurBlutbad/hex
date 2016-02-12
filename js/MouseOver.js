/**
 * Created by BK on 12.02.16.
 */
var MouseOver = function(level) {
    this.level = level;

    this.hex;

    this.marker = game.add.sprite(0,0, 'hoveredHex');
    this.marker.visible = false;
    this.level.markerGroup.add(this.marker);

    this.changeEvent = new Phaser.Signal();
    this.level.selection.changeEvent.add(this.onSelectionChange, this);
};

MouseOver.prototype = {

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

    onSelectionChange: function() {
        if(this.marker.children.indexOf(this.moveableMarker) !== -1)
            this.marker.removeChild(this.moveableMarker);

        if(this.level.selection.getUnit()) {
            this.moveableMarker = game.add.sprite(0,0, this.level.selection.getUnit().spriteReference);
            this.moveableMarker.alpha = 0.75;
            this.moveableMarker.visible = false;
            this.marker.addChild(this.moveableMarker);
        }
    },

    /**
     * Gets called when the given hex is entered.
     *
     * @param hex
     */
    enter: function(hex) {
        this.hex = hex;
        this.marker.x = hex.x;
        this.marker.y = hex.y;
        this.marker.visible = true;
        console.log(this);
        if(this.moveableMarker) {
            if(this.level.selection.getUnit() && this.level.selection.getUnit().canMoveTo(this.hex))
                this.moveableMarker.visible = true;
            else
                this.moveableMarker.visible = false;
        }

        this.changeEvent.dispatch(this);
    },

    /**
     * Gets called when the given hex is left.
     */
    leave: function(hex) {
        this.hex = undefined;
        this.marker.visible = false;

        this.changeEvent.dispatch(this);
    }
};