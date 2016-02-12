/**
 * Created by Kay on 31.01.2016.
 */
var Overlay = function(level) {
    var self = this;

    this.level = level;

    this.selectionText = {
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
        self.text.terrain.name = game.add.text( marginLeft, 50, '', style);
        self.text.terrain.movementCost = game.add.text( marginLeft, 70, '', style);
        self.text.unit.name = game.add.text( marginLeft, 90, '', style);
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

    this.createSelectionText();
    this.createRoundText();

    this.level.selection.changeEvent.add(this.updateSelectionText, this);
    this.level.turnManager.beginTurnEvent.add(this.updateRoundText, this);

    return this;

};

Overlay.prototype = {

    createRoundText: function() {
        this.roundTextGroup = game.add.group();
        var marginLeft = 20;
        var style = { font: '16px Courier', fill: '#ccc', align: 'left'};
        this.roundText = game.add.text( marginLeft, 20, 'Round: ' + this.level.turnManager.round, style);
        this.turnText = game.add.text( marginLeft, 36, 'Turn: ' + this.level.turnManager.currentSide.name, style);
        this.roundTextGroup.add(this.roundText);
        this.roundTextGroup.add(this.turnText);
        this.background.addChild(this.roundTextGroup);
    },

    updateRoundText: function () {
        this.roundText.setText('Round: ' + this.level.turnManager.round);
        this.turnText.setText('Turn: ' + this.level.turnManager.currentSide.name);
    },

    createSelectionText: function () {
        this.selectionTextGroup = game.add.group();
        var marginLeft = 20;
        var style = { font: '16px Courier', fill: '#ccc', align: 'left'};
        this.selectionText.terrain.name = game.add.text( marginLeft, 50, '', style);
        this.selectionText.terrain.movementCost = game.add.text( marginLeft, 70, '', style);
        this.selectionText.unit.name = game.add.text( marginLeft, 90, '', style);
        this.selectionTextGroup.add(this.selectionText.terrain.name);
        this.selectionTextGroup.add(this.selectionText.terrain.movementCost);
        this.selectionTextGroup.add(this.selectionText.unit.name);
        this.background.addChild(this.selectionTextGroup);
    },

    updateSelectionText: function (selection) {
        if(selection.hex) {
            var terrain = selection.hex.terrain;
            this.selectionText.terrain.name.setText(terrain? terrain.name : 'no name given');
            this.selectionText.terrain.movementCost.setText(terrain? terrain.movementCost : 'no movement cost given');
            var unit = selection.getUnit();
            this.selectionText.unit.name.setText(unit? unit.name: '');
        } else
            this.clearSelectionText();
    },

    clearSelectionText: function() {
        this.selectionText.terrain.name.setText('');
        this.selectionText.terrain.movementCost.setText('');
        this.selectionText.unit.name.setText('');
    }

};