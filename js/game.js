
    var hexagonWidth = 80;
    var hexagonHeight = 70;
    var gridSizeX = 20;
    var gridSizeY = 15;
    var moveIndex;
    var sectorWidth = hexagonWidth/4*3;
    var sectorHeight = hexagonHeight;
    var gradient = (hexagonWidth/4)/(hexagonHeight/2);
    var hexagonGroup;
    var hoveredHex;
    var selectedHex;
    var hoveredHexMarker;
    var selectedHexMarker;

    var panther;

    var debug = true;

    var game = new Phaser.Game(1066, 600);

    game.state.add('Test', States.Test);

    game.state.start('Test');