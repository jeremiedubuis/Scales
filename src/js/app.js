import Scales from '../../scales';
import tiles from '../img/tiles/tiles.png';
import link from '../img/characters/link.jpg';

const scales = window.scales = new Scales( document.getElementsByTagName('canvas')[0], {} );

document.getElementById('play').onclick = () => scales.api.togglePlayPause();

scales.api.load([tiles, link]).then((images) => {
    const grass = scales.api.createSprite(images[0],[50,26],[0,0]);
    const black = scales.api.createSprite(images[0],[50,26],[50,0]);
    const water = scales.api.createSprite(images[0],[50,26],[0,26]);
    const tiles = scales.api.createTiles(black, grass, water);

    const linkSprite = scales.api.createSpriteAnimated(images[1],[22,25], [{
        name: 'idle',
        coords: [
            [0,0],
            [22,0]
        ]
    }]);

    const link = scales.api.createCharacter('link', linkSprite);

    const map = scales.api.createMap([
        [1,1,1,2,1,1,1,1,1,1],
        [1,1,2,2,1,1,1,1,1,1],
        [1,1,2,1,1,1,1,1,1,1],
        [2,2,2,1,1,1,1,1,1,1],
        [1,1,1,1,1,2,1,1,1,1],
        [1,1,1,1,1,2,1,1,1,1],
        [1,1,1,1,2,2,1,1,1,1],
        [1,1,1,1,2,1,1,1,1,1],
        [1,1,1,1,2,2,1,1,1,1],
        [1,1,1,1,1,2,1,1,1,1]
    ],tiles);

    scales.stateHandler.setMap(map);
    scales.stateHandler.spawn(link, 0, 0);

    scales.update();

    scales.renderer.camera.centerOnMap(map);

    window.onkeydown = function(e) {

        if (!scales.paused) {
            switch(e.which) {

                case 37:
                    scales.api.moveCamera(-1,0);
                    break;

                case 38:
                    scales.api.moveCamera(0,-1);
                    break;

                case 39:
                    scales.api.moveCamera(1,0);
                    break;

                case 40:
                    scales.api.moveCamera(0,1);
                    break;

            }
        }
    };

});
