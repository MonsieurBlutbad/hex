var States = {};

States.Test = function (game) {
};

States.Test.prototype = {

    preload: function() {
        game.time.advancedTiming = true;

        game.load.image('grass', 'sprites/grass.png');
        game.load.image('mouseOverHex', 'sprites/mouseOverHex.png');
        game.load.image('selectedHex', 'sprites/selectedHex.png');
        game.load.image('panther', 'sprites/panther.png');
    },

    create: function() {
        game.stage.backgroundColor = '#ccc';

        hexagonGroup = game.add.group();

        for (var tileY = 0; tileY < gridSizeY; tileY ++) {
            for (var tileX = 0; tileX < gridSizeX; tileX ++) {

                var world = this.getWorldCoordinates(tileX, tileY);

                var hexagon = game.add.sprite(world.x, world.y, 'grass');

                var points = [];

                for (var i = 0; i < 6; i++) {
                    points[i] = {
                        x: (hexagon.width/2) + (hexagon.width / 2) * Math.sin(2*Math.PI/6*i + (2*Math.PI/12)),
                        y: (hexagon.height/2) + (hexagon.width / 2) * Math.cos(2*Math.PI/6*i + (2*Math.PI/12))
                    };
                }

                hexagon.hitArea = new Phaser.Polygon(points);

                hexagon.inputEnabled = true;

                hexagon.events.onInputDown.add(this.hexClicked, this);

                hexagon.events.onInputOver.add(this.hexHovered, this);

                if(debug) {
                    var style = { font: "12px Courier", fill: "#000000", align: "center" };
                    var text = game.add.text(20, 10, tileX + ',' + tileY, style);
                    hexagon.addChild(text);
                }

                hexagonGroup.add(hexagon);
            }
        }

        mouseOverHex = game.add.sprite(0,0,'mouseOverHex');
        mouseOverHex.visible=false;

        selectedHex = game.add.sprite(0,0,'selectedHex');
        selectedHex.visible=false;

        panther = this.createAtTile(3, 3, 'panther');

        var graphicOverlay = new Phaser.Graphics(this.game, 0 , 0);
        graphicOverlay.beginFill(0x000000, 0.7);
        graphicOverlay.drawRect(0, 0, 266, 600);
        graphicOverlay.endFill();
        this.overlay = this.game.add.image(800, 0, graphicOverlay.generateTexture());
        this.overlay.fixedToCamera = true;
        this.overlay.inputEnabled = true;

        game.input.mouse.capture = true;

        cursors = game.input.keyboard.createCursorKeys();
        game.world.setBounds(0, 0, 2000, 2000);

    },

    update: function () {
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
        game.debug.text.fontSize = 8;
        game.debug.text(game.time.fps || '--', 2, 14, '#00ff00', '14px Courier');
    },

    hexClicked: function (hex) {
        selectedHex.visible=true;
        selectedHex.x = hex.x;
        selectedHex.y = hex.y;
    },

    hexHovered: function (hex) {
        mouseOverHex.visible=true;
        mouseOverHex.x = hex.x;
        mouseOverHex.y = hex.y;
    },

    createAtTile: function (tileX, tileY, spriteReference) {
        var world = this.getWorldCoordinates(tileX, tileY);
        return game.add.sprite(world.x, world.y, spriteReference);
    },

    getWorldCoordinates: function (tileX, tileY) {
        if (tileX < 0 || tileY < 0 || tileX >= gridSizeX || tileY >= gridSizeY) {
            return null;
        }
        var world = {};
        world.x = (hexagonWidth * 0.75) * tileX;
        world.y = hexagonHeight * tileY + ((tileX % 2) * (hexagonHeight / 2));
        return world;
    },

    getHex: function (tileX, tileY) {
        return hexagonGroup.children[tileY * gridSizeX + tileX];
    }

};
