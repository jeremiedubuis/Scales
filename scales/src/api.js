import GameObject from './gameObject/GameObject';
import Map from './map/Map';
import Sprite from './sprites/Sprite';
import SpriteAnimated from './sprites/SpriteAnimated';
import Tile from './map/Tile';

export default function api(scales) {

    return {

        createCharacter(id, sprite) {
            return new GameObject(id, sprite);
        },

        createSprite(img, size, position) {
            return new Sprite(img, size, position);
        },

        createSpriteAnimated(img, size, animations) {
            return new SpriteAnimated(img, size, animations);

        },

        createTiles(...sprite) {
            return sprite.map(s => new Tile(s));
        },

        createMap(tiles, tileTypes) {
            return new Map(tiles, tileTypes);
        },

        load(sources, cb) {
            return scales.loader.loadImages(sources, cb);
        },

        moveCamera(x,y) {
            return scales.renderer.camera.move(x, y);
        },

        spawn(gameObject, x, y) {
            scales.stateHandler.spawn(gameObject, x, y);
        },

        togglePlayPause() {
            scales.paused = !scales.paused;
            if (!scales.paused) scales.update();
        }

    };

};