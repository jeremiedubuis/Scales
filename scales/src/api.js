import GameObject from './gameObject/GameObject';
import Map from './map/Map';
import Sprite from './sprites/Sprite';
import SpriteAnimated from './sprites/SpriteAnimated';
import Tile from './map/Tile';
import Scales from './Scales';

export default function api(scales) {

    return {

        on(str, cb) {
            Scales.on(str, cb);
        },

        onLoad(cb) {

        },

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
            if (!Array.isArray(sources)) sources = [sources];
            return scales.loader.loadImages(sources, cb);
        },

        camera: {

            get position() {
                return scales.renderer.camera.position;
            },

            move(x,y) {
                return scales.renderer.camera.move(x, y);
            },

            moveTo(x,y) {
                return scales.renderer.camera.moveTo(x, y);
            },

            setRadius(radius) {
                scales.renderer.camera.setRadius(radius);
            }
        },

        spawn(gameObject, x, y) {
            scales.stateHandler.spawn(gameObject, x, y);
        },

        togglePlayPause() {
            scales.paused = !scales.paused;
            if (!scales.paused) scales.update();
            return scales.paused;
        },

        setFrame(frame) {
            scales.setFrame(frame);
        }

    };

};