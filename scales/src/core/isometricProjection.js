import config from '../../config.js';
import Vector2 from '../core/Vector2';

const halfTileWidth = config.tiles.size * .5;
const halfTileHeight = config.tiles.size * .25;

const tileToWorld = (x,y) => [x*config.tiles.size,y*config.tiles.size];
const worldToTile = (x,y) => [x/config.tiles.size,y/config.tiles.size];

const tileToScreen = (x, y, xOffset = 0) => new Vector2(
    (x-y) * halfTileWidth + xOffset,
    (y+x) * halfTileHeight
);

const worldToScreen = (x, y, xOffset) => tileToScreen(...worldToTile(x,y), xOffset);

const screenToTile = (x, y) => [
    (x / halfTileWidth + y / halfTileHeight) / 2,
    (y / halfTileHeight - x / halfTileWidth) / 2
];

const screenToWorld = (x, y) => screenToTile(x, y).map(val => val * config.tiles.size);

export {
    screenToTile,
    screenToWorld,
    tileToScreen,
    tileToWorld,
    worldToScreen,
    worldToTile
};