/**
 * Created by BK on 04.02.16.
 */
var Side = function(level, name, type) {

    if(!level || !name || !type)
        console.log('Warning: illegal arguments', this, arguments);

    this.level = level;
    this.name = name;
    this.type = type;
};