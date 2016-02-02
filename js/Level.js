var Level = function () {
    this.grid = {
        width: null,
        height: null
    };
    this.hexGroup;
    this.terrainGroup;
    this.unitGroup;
    this.selectedHex;
    this.selectedUnit;
    this.selectedHex;
    this.overlay;
    this.worldBounds;

    this.hex = [[]];

};


Level.prototype = {

    init: function () {
        this.worldBounds = {
            x: this.grid.width * (HEX_WIDTH * 0.75) + OVERLAY_WIDTH + (HEX_WIDTH * 0.25),
            y: this.grid.height * HEX_HEIGHT + (HEX_HEIGHT / 2)
        }
    },

    preload: function() {
        game.time.advancedTiming = true;
        game.load.image('mouseOverHex', 'sprites/hoveredHexMarker.png');
        game.load.image('selectedHex', 'sprites/selectedHex.png');

        this.loadAssets();
    },

    loadAssets: function () {},

    create: function() {

        this.terrainGroup = game.add.group();

        this.unitGroup = game.add.group();

        this.hexGroup = game.add.group();

        game.stage.backgroundColor = BACKGROUND_COLOR;

        this.displayObjects = game.add.group();

        this.createGrid();

        this.createTerrain();

        this.createUnits();

        this.createOverlay();

        game.input.mouse.capture = true;

        cursors = game.input.keyboard.createCursorKeys();

        game.world.setBounds(0, 0, this.worldBounds.x, this.worldBounds.y);

    },

    createGrid: function() {
        for (var tileX = 0; tileX < this.grid.width; tileX++) {
            this.hex[tileX] = [];
            for (var tileY = 0; tileY < this.grid.height; tileY ++) {
                this.hex[tileX][tileY] = new Hex(this, tileX, tileY);
                this.hexGroup.add(this.hex[tileX][tileY]);
            }
        }
    },

    createTerrain: function() {},

    createUnits: function() {},

    createOverlay: function () {
        this.overlay = new Overlay(this);
    },

    update: function () {
        this.updateCamera();
    },

    updateCamera: function () {
        // Horizontal Movement
        if(cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            game.camera.x -= 10;
        } else if(cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            game.camera.x += 10;
        }
        // Vertical Movement
        if(cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            game.camera.y -= 10;
        } else if(cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            game.camera.y += 10;
        }
    },

    render: function() {
        if(DEBUG) {
            this.renderFps();
        }
    },

    renderFps: function() {
        game.debug.text.fontSize = 8;
        game.debug.text(game.time.fps || '--', 2, 14, '#00ff00', '14px Courier');
    },

    getWorldCoordinates: function (tileX, tileY) {
        if (tileX < 0 || tileY < 0 || tileX >= this.grid.width || tileY >= this.grid.height) {
            return null;
        }
        return {
            x: (HEX_WIDTH * 0.75) * tileX,
            y: HEX_HEIGHT * tileY + ((tileX % 2) * (HEX_HEIGHT / 2))
        };
    },

};
