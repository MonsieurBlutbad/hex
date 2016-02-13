var Level = function () {

    this.grid = {
        width: null,
        height: null
    };

    this.hexGroup;

    this.terrainGroup;

    this.unitGroup;

    this.markerGroup;

    this.overlay;

    this.worldBounds;

    this.turnManager;

    this.selection;

    this.mouseOver;

    // TODO
    this.isDragging = false;

    this.hex = [[]];

    this.sides = [];

};


Level.prototype = {

    /**
     * Basic Initialisation of the Level
     */
    init: function () {
        this.worldBounds = {
            x: this.grid.width * (HEX_WIDTH * 0.75) + OVERLAY_WIDTH + (HEX_WIDTH * 0.25),
            y: this.grid.height * HEX_HEIGHT + (HEX_HEIGHT / 2)
        };
    },

    /**
     * Initialise the Sides that are part of this Level
     */
    initSides: function () {},

    /**
     * Preload general assets
     */
    preload: function() {
        game.time.advancedTiming = true;
        game.load.image('hoveredHex', 'sprites/hoveredHexMarker.png');
        game.load.image('selectedHex', 'sprites/selectedHex.png');

        this.loadAssets();
    },

    /**
     * Preload level specific assets
     */
    loadAssets: function () {},

    /**
     * Create Groups, Units and a bunch of other stuff
     */
    create: function() {
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        this.terrainGroup = game.add.group();

        this.unitGroup = game.add.group();

        this.hexGroup = game.add.group();

        this.markerGroup = game.add.group();

        this.turnManager = new TurnManager(this);

        this.selection = new Selection(this);

        this.mouseOver = new MouseOver(this);

        this.initSides();

        game.stage.backgroundColor = BACKGROUND_COLOR;

        this.createGrid();

        this.createTerrain();

        this.createUnits();

        this.turnManager.initEvent.dispatch();

        this.createOverlay();

        game.input.mouse.capture = true;

        cursors = game.input.keyboard.createCursorKeys();

        game.world.setBounds(0, 0, this.worldBounds.x, this.worldBounds.y);

        var nextTurnKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
        nextTurnKey.onDown.add(function() {
            this.turnManager.nextTurnEvent.dispatch(this);
        }, this);

    },

    /**
     * Creates the world grid Hex array
     */
    createGrid: function() {
        for (var tileX = 0; tileX < this.grid.width; tileX++) {
            this.hex[tileX] = [];
            for (var tileY = 0; tileY < this.grid.height; tileY ++) {
                this.hex[tileX][tileY] = new Hex(this, tileX, tileY);
                this.hexGroup.add(this.hex[tileX][tileY]);
            }
        }
    },

    /**
     * Creates the Terrain of the Level
     */
    createTerrain: function() {},

    /**
     * Creates the Units of the Level
     */
    createUnits: function() {},

    /**
     * Creates the given unit for the given side at the given tile
     *
     * @param unitClass
     * @param side
     * @param tileX
     * @param tileY
     */
    createUnit: function(unitClass, side, tileX, tileY) {
        if(!unitClass || !side || !tileX || !tileY)
            console.log("Warning, illegal arguments", this, arguments);

        var unit = new unitClass(this, side, tileX, tileY);
        this.unitGroup.add(unit);
        this.hex[tileX][tileY].setUnit(unit);
    },

    /**
     * Creates the UI Overlay
     */
    createOverlay: function () {
        this.overlay = new Overlay(this);
    },

    /**
     * Main Update Loop
     */
    update: function () {
        this.updateCamera();
    },

    /**
     * Updates the camera position
     */
    updateCamera: function () {
        // Keyboard Movement
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
        // Mouse Movement
        // Drag Movement
        if (game.input.activePointer.rightButton.isDown) {
            if (game.origDragPoint) {
                var dragX = game.origDragPoint.x - game.input.activePointer.position.x;
                var dragY = game.origDragPoint.y - game.input.activePointer.position.y;
                if(dragX + dragY !== 0) {
                    // move the camera by the amount the mouse has moved since last update
                    game.camera.x += dragX;
                    game.camera.y += dragY;
                    this.isDragging = true;
                }
            }
            // set new drag origin to current position
            game.origDragPoint = game.input.activePointer.position.clone();
        } else {
            game.origDragPoint = null;
            this.isDragging = false;

        }

    },

    /**
     * Render Function (gets called after update)
     */
    render: function() {
        if(DEBUG) {
            this.renderFps();
        }
    },

    /**
     * Renders the Frames per Second
     */
    renderFps: function() {
        game.debug.text.fontSize = 8;
        game.debug.text(game.time.fps || '--', 2, 14, '#00ff00', '14px Courier');
    },

    /**
     * Calculates World Coordinates from Tile Coordinates
     *
     * @param tileX
     * @param tileY
     * @returns {*}
     */
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
