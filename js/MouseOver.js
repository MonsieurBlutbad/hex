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

    enter: function(hex) {
        this.hex = hex;
        this.marker.x = hex.x;
        this.marker.y = hex.y;
        this.marker.visible = true;

        this.changeEvent.dispatch(this);
    },

    leave: function() {
        this.hex = undefined;
        this.marker.visible = false;

        this.changeEvent.dispatch(this);
    }
};