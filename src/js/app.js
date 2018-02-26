import Scales from '../../scales';
import link from '../img/characters/link.jpg';

const scales = window.scales = new Scales( document.getElementsByTagName('canvas')[0], {} );

document.getElementById('play').onclick = () => scales.api.togglePlayPause();

Scales.on('load', ({tiles}) => {

    console.log('loaded from config', tiles);

    /**
    const linkSprite = scales.api.createSpriteAnimated(images[1],[22,26], [{
        name: 'idle',
        coords: [
            [0,0],
            [22,0]
        ]
    }]);

    const link = scales.api.createCharacter('link', linkSprite);

     **/

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
    ], tiles);

    scales.stateHandler.setMap(map);
    //scales.stateHandler.spawn(link, 0, 0);

    scales.update();

    scales.renderer.camera.centerOnMap(map);


    document.getElementById('camera-radius').onkeydown = (e) => {
        e.stopPropagation();
        if (e.which === 13) {
            scales.api.camera.setRadius(e.target.value);
        }
    };

    window.onkeydown = function(e) {

        if (!scales.paused) {
            switch(e.which) {

                case 37:
                    scales.api.camera.move(-1,0);
                    break;

                case 38:
                    scales.api.camera.move(0,-1);
                    break;

                case 39:
                    scales.api.camera.move(1,0);
                    break;

                case 40:
                    scales.api.camera.move(0,1);
                    break;

            }
        }
    };

});
