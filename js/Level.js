var Level = function () {
    this.grid = {
        x: undefined,
        y: undefined
    };
    this.hexFactory = new HexFactory(this);
    this.terrainFactory = new TerrainFactory(this);
    this.unitFactory = new UnitFactory(this);
    this.hexGroup;
    this.terrainGroup;
    this.unitGroup;
    this.selectedHex;
    this.hoveredHexMarker;
    this.selectedHexMarker;
    this.overlay;
    this.overlayText = {
        terrain: {
            name: '',
            movementCost: ''
        },
        unit: {
            name: ''
        }
    };
    this.worldBounds;
    this.hex = [[]];

};


Level.prototype = {

    init: function () {
        this.worldBounds = {
            x: this.grid.x * (HEX_WIDTH * 0.75) + OVERLAY_WIDTH + (HEX_WIDTH * 0.25),
            y: this.grid.y * HEX_HEIGHT + (HEX_HEIGHT / 2)
        }
    },

    preload: function() {
        game.time.advancedTiming = true;
        game.load.image('hex', 'sprites/hex.png');
        game.load.image('mouseOverHex', 'sprites/mouseOverHex.png');
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

        this.hoveredHexMarker = game.add.sprite(0,0,'mouseOverHex');
        this.hoveredHexMarker.visible=false;

        this.selectedHexMarker = game.add.sprite(0,0,'selectedHex');
        this.selectedHexMarker.visible=false;

        game.input.mouse.capture = true;

        cursors = game.input.keyboard.createCursorKeys();

        game.world.setBounds(0, 0, this.worldBounds.x, this.worldBounds.y);

    },

    createGrid: function() {
        this.hexGroup.zIndex = 1;
        for (var tileX = 0; tileX < this.grid.x; tileX++) {
            this.hex[tileX] = [];
            for (var tileY = 0; tileY < this.grid.y; tileY ++) {
                this.hex[tileX][tileY] = this.hexFactory.createHex(tileX, tileY);
                this.hexGroup.add(this.hex[tileX][tileY]);
            }
        }
    },

    createTerrain: function() {},

    createUnits: function() {},

    createOverlay: function () {
        var graphicOverlay = new Phaser.Graphics(this.game, 0 , 0);
        graphicOverlay.beginFill(0x222222);
        graphicOverlay.drawRect(0, 0, OVERLAY_WIDTH, HEIGHT);
        graphicOverlay.endFill();
        this.overlay = this.game.add.image(800, 0, graphicOverlay.generateTexture());
        this.overlay.fixedToCamera = true;
        this.overlay.inputEnabled = true;
        var graphicOverlayShadow = new Phaser.Graphics(this.game, 0 , 0);
        graphicOverlayShadow.beginFill(0x222222, 0.5);
        graphicOverlayShadow.drawRect(-HEX_WIDTH / 16, 0, HEX_WIDTH / 16, HEIGHT);
        graphicOverlayShadow.endFill();
        this.overlay.addChild(graphicOverlayShadow);
        this.createOverlayText();

    },

    createOverlayText: function () {
        var marginLeft = 20;
        var style = { font: '16px Courier', fill: '#ccc', align: 'left'};
        this.overlayText.terrain.name = game.add.text( marginLeft, 50, 'Terrain', style);
        this.overlayText.terrain.movementCost = game.add.text( marginLeft, 70, 'Movement', style);
        this.overlayText.unit.name = game.add.text( marginLeft, 90, 'Unit', style);
        this.overlay.addChild(this.overlayText.terrain.name);
        this.overlay.addChild(this.overlayText.terrain.movementCost);
        this.overlay.addChild(this.overlayText.unit.name);
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

    hexClicked: function (hex) {
        this.selectedHexMarker.visible = true;
        this.selectedHexMarker.x = hex.x;
        this.selectedHexMarker.y = hex.y;
    },

    hexHovered: function (hex) {
        this.hoveredHexMarker.visible = true;
        this.hoveredHexMarker.x = hex.x;
        this.hoveredHexMarker.y = hex.y;
        this.overlayText.terrain.name.setText(hex.terrain.name);
        this.overlayText.terrain.movementCost.setText(hex.terrain.movementCost);
        if (hex.unit) {
            this.overlayText.unit.name.setText(hex.unit.name);
            this.overlayText.unit.name.visible = true;
        } else
            this.overlayText.unit.name.setText('');
        this.overlayText.terrain.name.visible = true;
        this.overlayText.terrain.movementCost.visible = true;
    },

    hexLeft: function (hex) {
        this.hoveredHexMarker.visible = false;
        this.overlayText.terrain.name.visible = false;
        this.overlayText.terrain.movementCost.visible = false;
        this.overlayText.unit.name.visible = false;

    },

    getWorldCoordinates: function (tileX, tileY) {
        if (tileX < 0 || tileY < 0 || tileX >= this.grid.x || tileY >= this.grid.y) {
            return null;
        }
        return {
            x: (HEX_WIDTH * 0.75) * tileX,
            y: HEX_HEIGHT * tileY + ((tileX % 2) * (HEX_HEIGHT / 2))
        };
    },

    getTileCoordinates: function (worldX, worldY) {
        return {
            x: Math.floor(worldX / HEX_WIDTH),
            y: Math.floor(worldY / HEX_HEIGHT)
        }
    },

};
