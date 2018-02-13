// @flow
import Tile from './Tile';
import Vector2 from '../core/Vector2';
let mapIndex = 0;
export default class Map {
    index: number;
    tiles: Array<number>;
    tileSize: number;
    tileSizeHalf: number;
    xOffset: number;
    tileTypes: Object;

    constructor( tiles: Array<Array<number>>, tileTypes: Array<Tile> ) {
        this.index = mapIndex++;
        this.tiles = tiles;
        this.tileWidth = tileTypes[0].width;
        this.tileHeight = tileTypes[0].height;
        this.xOffset = this.tileWidth * .5 * this.tiles.length;
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

    mapToScreenSpace( x, y ) {

        let wHalf = this.tileWidth * .5;
        let hHalf = this.tileHeight * .5;

        let _x = (x*wHalf) - (y*wHalf) + this.xOffset;
        y = (y*hHalf ) + (x*hHalf );
        return new Vector2(_x, y);

    }

}