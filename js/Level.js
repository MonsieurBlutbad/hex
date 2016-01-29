var Level = function (game) {
    this.grid = {
        x: undefined,
        y: undefined
    };
    this.terrainFactory;
    this.unitFactory;
};


Level.prototype = {

    preload: function() {
        game.time.advancedTiming = true;
        game.load.image('mouseOverHex', 'sprites/mouseOverHex.png');
        game.load.image('selectedHex', 'sprites/selectedHex.png');

        this.loadAssets();
    },

    loadAssets: function () {},

    create: function() {

        game.stage.backgroundColor = '#ccc';

        this.createTerrain();

        this.createUnits();

        this.createGrid();

        this.createOverlay();

        hoveredHexMarker = game.add.sprite(0,0,'mouseOverHex');
        hoveredHexMarker.visible=false;

        selectedHexMarker = game.add.sprite(0,0,'selectedHex');
        selectedHexMarker.visible=false;


        game.input.mouse.capture = true;

        cursors = game.input.keyboard.createCursorKeys();

        game.world.setBounds(0, 0, 2000, 2000);

    },

    createGrid: function() {},

    createTerrain: function() {},

    createUnits: function() {},

    createOverlay: function () {
        var graphicOverlay = new Phaser.Graphics(this.game, 0 , 0);
        graphicOverlay.beginFill(0x000000, 0.7);
        graphicOverlay.drawRect(0, 0, 266, 600);
        graphicOverlay.endFill();
        this.overlay = this.game.add.image(800, 0, graphicOverlay.generateTexture());
        this.overlay.fixedToCamera = true;
        this.overlay.inputEnabled = true;
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
        this.renderFps();
    },

    renderFps: function() {
        game.debug.text.fontSize = 8;
        game.debug.text(game.time.fps || '--', 2, 14, '#00ff00', '14px Courier');
    },

    hexClicked: function (hex) {
        selectedHexMarker.visible=true;
        selectedHexMarker.x = hex.x;
        selectedHexMarker.y = hex.y;
    },

    hexHovered: function (hex) {
        hoveredHexMarker.visible=true;
        hoveredHexMarker.x = hex.x;
        hoveredHexMarker.y = hex.y;
    },

    getWorldCoordinates: function (tileX, tileY) {
        if (tileX < 0 || tileY < 0 || tileX >= gridSizeX || tileY >= gridSizeY) {
            return null;
        }
        return {
            x: (hexagonWidth * 0.75) * tileX,
            y: hexagonHeight * tileY + ((tileX % 2) * (hexagonHeight / 2))
        };
    },

    getTileCoordinates: function (worldX, worldY) {
        return {
            x: Math.floor(worldX / hexagonWidth),
            y: Math.floor(worldY / hexagonHeight)
        }
    },

};
