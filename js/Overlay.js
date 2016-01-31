/**
 * Created by Kay on 31.01.2016.
 */
var Overlay = function(level) {
    var self = this;

    this.text = {
        terrain: {
            name: '',
            movementCost: ''
        },
        unit: {
            name: ''
        }
    };

    var createText = function () {
        self.textGroup = game.add.group();
        var marginLeft = 20;
        var style = { font: '16px Courier', fill: '#ccc', align: 'left'};
        self.text.terrain.name = game.add.text( marginLeft, 50, 'Terrain', style);
        self.text.terrain.movementCost = game.add.text( marginLeft, 70, 'Movement', style);
        self.text.unit.name = game.add.text( marginLeft, 90, 'Unit', style);
        self.textGroup.add(self.text.terrain.name);
        self.textGroup.add(self.text.terrain.movementCost);
        self.textGroup.add(self.text.unit.name);
        self.background.addChild(self.textGroup);
    };

    var graphicOverlay = new Phaser.Graphics(game, 0 , 0);
    graphicOverlay.beginFill(0x222222);
    graphicOverlay.drawRect(0, 0, OVERLAY_WIDTH, HEIGHT);
    graphicOverlay.endFill();
    this.background = game.add.image(800, 0, graphicOverlay.generateTexture());
    this.background.fixedToCamera = true;
    this.background.inputEnabled = true;
    var graphicOverlayShadow = new Phaser.Graphics(game, 0 , 0);
    graphicOverlayShadow.beginFill(0x222222, 0.5);
    graphicOverlayShadow.drawRect(-HEX_WIDTH / 16, 0, HEX_WIDTH / 16, HEIGHT);
    graphicOverlayShadow.endFill();
    this.background.addChild(graphicOverlayShadow);
    createText();

    return this;

};

Overlay.prototype = {

    showText: function () {
        this.textGroup.visible = true;
    },

    hideText: function () {
        this.textGroup.visible = false;
    },

    updateText: function (hex) {
        if(! hex instanceof Hex )
            console.log('Bad Argument. Expected Hex, got' + hex, this);
        var terrain = hex.terrain;
        this.text.terrain.name.setText(terrain? terrain.name : 'no name given');
        this.text.terrain.movementCost.setText(terrain? terrain.movementCost : 'no movement cost given');
        var unit = hex.unit;
        this.text.unit.name.setText(unit? unit.name: 'no unit name given');
    }

};