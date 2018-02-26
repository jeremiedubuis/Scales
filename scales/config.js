import tiles from '../src/img/tiles/tiles.png';

export default {

    tiles: {
        size: 52,
        types: {
            black: {
                src: tiles,
                coords: [52,0]
            },
            grass: {
                src: tiles,
                coords: [0,0]
            },
            water: {
                src: tiles,
                coords: [0,26]
            }
        }
    }

};