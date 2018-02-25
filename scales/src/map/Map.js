// @flow
import Tile from './Tile';
import Vector2 from '../core/Vector2';
let mapIndex = 0;



function vectorToTile(vector) {
    let wHalf = 50 * .5;
    let hHalf = 26 * .5;
    let x = vector.x / wHalf; // = x-y
    console.log("x-y",x)
    let y = vector.y / hHalf; // = x+y
    console.log("x+y",y)
    // (x+y) - (x-y) === y - (-y) === y + y = y*2
    y = (y - x) * 0.5;
    console.log('(x+y) - (x-y) === y - (-y) === y + y = y*2', y)
    x = x + y ;
    return [Math.floor(x), Math.ceil(y)];
}

export default class Map {
    index: number;
    tiles: Array<number>;
    tileTypes: Object;

    constructor( tiles: Array<Array<number>>, tileTypes: Array<Tile> ) {
        this.index = mapIndex++;
        this.tiles = tiles;
        this.tileWidth = tileTypes[0].width;
        this.tileHeight = tileTypes[0].height;
        this.tileRatio = this.tileHeight /  this.tileWidth;
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

    tileToVector(x, y) {
        let wHalf = this.tileWidth * 0.5;
        let hHalf = this.tileHeight * 0.5;

        return new Vector2(
            (x-y) * wHalf,
            (y+x) * hHalf
        );
    }



    vectorToTile(vector) {
        let wHalf = this.tileWidth * .5;
        let hHalf = this.tileHeight * .5;
        let x = -vector.x / wHalf; // = x-y
        let y = vector.y / hHalf; // = x+y
        // (x+y) - (x-y) === y - (-y) === y + y = y*2
        y = (y - x) * 0.5;
        x = x + y ;
        return [Math.floor(x), Math.floor(y)];
    }

    /**
     * test -28;10 should return 0;1
     * x = -28 / 25 = -1.12
     * y = 10 / 13 =  0.77
     * y =  (0.77 - -1.22) /2 = -1.99 / 2 = 0.995
     * x = 1.12 +  (-0.225) = 0.895
     *  [0, -1]
     */

    // tile 0 is rendered at -.5 * tileWidth

    mapToScreenSpace( x, y, camera ) {
        let wHalf = this.tileWidth * .5;
        let hHalf = this.tileHeight * .5;

        let _x = (x*wHalf) - (y*wHalf) ;
        y = (y*hHalf ) + (x*hHalf );
        return new Vector2(_x-wHalf, y).deduce(camera.position);

    }

    getBoundingTilesFromCamera(camera) {
        const firstVisibleWorldPixel = camera.position.deduce(new Vector2(camera.radius, camera.radius), true).add(this.origin);
    }

}