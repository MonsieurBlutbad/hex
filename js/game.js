window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload: preload, create: create, update: update, render: render});

    var hexagonWidth = 80;
    var hexagonHeight = 70;
    var gridSizeX = 13;
    var gridSizeY = 8;
    var moveIndex;
    var sectorWidth = hexagonWidth/4*3;
    var sectorHeight = hexagonHeight;
    var gradient = (hexagonWidth/4)/(hexagonHeight/2);
    var mouseOverHex;
    var selectedHex;
    var hexagonGroup;

    var panther;


    function preload() {
        game.time.advancedTiming = true;

        game.load.image('grass', 'sprites/grass.png');
        game.load.image('mouseOverHex', 'sprites/mouseOverHex.png');
        game.load.image('selectedHex', 'sprites/selectedHex.png');
        game.load.image('panther', 'sprites/panther.png');
    }

    function create() {
        hexagonGroup = game.add.group();
        game.stage.backgroundColor = '#ccc';

        for (var tileY = 0; tileY < gridSizeY; tileY ++) {
            for (var tileX = 0; tileX < gridSizeX; tileX ++) {
                var world = tileToWorld(tileX, tileY);
                var hexagon = game.add.sprite(world.x, world.y, 'grass');
                hexagonGroup.add(hexagon);
            }
        }

        mouseOverHex = game.add.sprite(0,0,'mouseOverHex');
        mouseOverHex.visible=false;

        selectedHex = game.add.sprite(0,0,'selectedHex');
        selectedHex.visible=false;

        panther = createAtTile(3, 3);

        moveIndex = game.input.addMoveCallback(checkHex, this);

        game.input.mouse.capture = true;
    }

    function createAtTile(tileX, tileY) {
        var world = tileToWorld(tileX, tileY);
        return game.add.sprite(world.x, world.y, 'panther');
    }

    function tileToWorld(tileX, tileY) {
        if (tileX < 0 || tileY < 0 || tileX >= gridSizeX || tileY >= gridSizeY) {
            return null;
        }
        var world = {};
        world.x = (hexagonWidth * 0.75) * tileX;
        world.y = hexagonHeight * tileY + ((tileX % 2) * (hexagonHeight / 2));
        return  world;
    }

    function getMouseOverHex() {
        var tileX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
        var tileY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
        var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
        var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight;
        if(tileX%2==0){
            if(deltaX<((hexagonWidth/4)-deltaY*gradient)){
                tileX--;
                tileY--;
            }
            if(deltaX<((-hexagonWidth/4)+deltaY*gradient)){
                tileX--;
            }
        }
        else{
            if(deltaY>=hexagonHeight/2){
                if(deltaX<(hexagonWidth/2-deltaY*gradient)){
                    tileX--;
                }
            }
            else{
                if(deltaX<deltaY*gradient){
                    tileX--;
                }
                else{
                    tileY--;
                }
            }
        }

        if (tileX < 0 || tileY < 0 || tileX >= gridSizeX || tileY >= gridSizeY) {
            return null;
        }

        return getHex(tileX, tileY);
    }

    function checkHex(){
        var hex = getMouseOverHex();
        if(hex)
            placeMarker(hex);
    }

    function placeMarker(hex) {
        mouseOverHex.visible=true;
        mouseOverHex.x = hex.x;
        mouseOverHex.y = hex.y;
    }

    function getHex(tileX, tileY) {
        return hexagonGroup.children[tileY * gridSizeX + tileX];
    }

    function update() {
        game.input.onDown.add(selectHex, this);
        console.log()
    }

    function selectHex() {
        var hex = getMouseOverHex();
        if(hex) {
            selectedHex.visible=true;
            selectedHex.x = hex.x;
            selectedHex.y = hex.y;
        }
    }

    function render() {
        game.debug.text.fontSize = 8;
        game.debug.text(game.time.fps || '--', 2, 14, '#00ff00', '14px Courier');
        for (var i = 0; i < hexagonGroup.children.length; i++) {
            game.debug.text(
                i % gridSizeX + ',' + Math.floor(i / gridSizeX),
                hexagonGroup.children[i].x + 20,
                hexagonGroup.children[i].y + 12,
                '#ff0000',
                '10px Courier'
            );
        }
        /*    for (var i = 0; i < enemies.green.length; i++){
         game.debug.body(enemies.green.children[i]);
         }
         game.debug.body(spaceship);
         spaceship.children.forEach( function(child) {
         game.debug.body(child)
         });*/
    }

};