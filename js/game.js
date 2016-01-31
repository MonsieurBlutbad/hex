const WIDTH = 1066;

const HEIGHT = 600;

const HEX_WIDTH = 80;

const HEX_HEIGHT = 70;

const OVERLAY_WIDTH = 266;

const DEBUG = true;

const BACKGROUND_COLOR = '#999';

var game = new Phaser.Game(WIDTH, HEIGHT);

window.onload = function () {

    var body = document.getElementById('body');

    game.state.add('Test', States.Test);

    game.state.start('Test');

    body.style.width = WIDTH + 'px';

};