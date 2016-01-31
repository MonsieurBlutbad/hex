var Hex = function () {
    this.terrain = undefined;
    this.unit = undefined;
};

Hex.prototype = {
    setTerrain: function(terrain) {
        this.terrain = terrain;
    },

    setUnit: function(unit) {
        this.unit = unit;
    },

    removeUnit: function() {
        this.unit = undefined;
    }
};
