// @flow
import Tile from './Tile';
import Vector2 from '../core/Vector2';
let mapIndex = 0;



export default class Map {
    index: number;
    tiles: Array<number>;
    tileTypes: Object;

    constructor( tiles: Array<Array<number>>, tileTypes: Array<Tile> ) {
        this.index = mapIndex++;
        this.tiles = tiles;
        this.tileWidth = tileTypes[0].width;
        this.tileHeight = tileTypes[0].height;
        this.tileHalfWidth = this.tileWidth * 0.5;
        this.tileHalfHeight = this.tileHeight * 0.5;
        this.tileRatio = this.tileWidth / this.tileHeight;
        this.origin = new Vector2(- 0.5 * this.tileWith, 0);
        this.setTileTypes(tileTypes);
    }

    setTileTypes( tileTypes ) {
        this.tileTypes = {};
        tileTypes.forEach(tileType => {
            this.tileTypes[tileType.index] = tileType;
        });
    }

    getTile( tileIndex ) {
        return this.tileTypes[tileIndex];
    }

    getTileAtPosition(position : Vector2) {

        let wHalf = this.tileWidth * .5;
        let hHalf = this.tileHeight * .5;

        return [
            (position.y - position.x/hHalf ) / hHalf +wHalf,
            (position.x + (position.y/wHalf)) / wHalf
        ];
    }

    getBoundingTilesFromCamera(camera) {
        const firstVisibleWorldPixel = camera.position.deduce(new Vector2(camera.radius, camera.radius), true).add(this.origin);
    }

}