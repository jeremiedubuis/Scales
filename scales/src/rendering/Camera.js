import Vector2 from '../core/Vector2';
import isometricToTile from './isometricToTile';
import tileToIsometric from './tileToIsometric';

type typeOptions = {
    position?: Vector2,
    canvas: HTMLElement,
    radius?: number
}


const coordinatesAreVisible = (arr, values) => {

    for (let i = 0, iLength = arr.length; i<iLength;i++) {
        if (arr[i][0] === values[0] && arr[i][1] === values[1]) return true;
    }
    return false;
};

export default class Camera {
    position: Vector2;
    radius: number;
    visibleMap: Array<number>;

    constructor({ position = new Vector2(0,0), radius = 150, tileSize = 52 } : typeOptions) {
        this.position = position;
        this.radius = radius;
        this.tileSize = 52;
        this.tileRadius = Math.ceil(this.radius/this.tileSize);
    }

    getVisibleTiles(map) {

        if (!this.lastPosition || !this.lastPosition.comparePosition(this.position)) {


            const visibleTiles =  this.getTilesInRadius(
                Math.floor(this.position.x / this.tileSize),
                Math.floor(this.position.y / this.tileSize)
            );

            let biggestX = visibleTiles[0][0];
            let smallestX = visibleTiles[0][0];
            let biggestY = visibleTiles[0][1];
            let smallestY = visibleTiles[0][1];
            visibleTiles.forEach(coords => {
                if (coords[0] < smallestX) smallestX = coords[0];
                else if (coords[0] > biggestX) biggestX = coords[0];
                if (coords[1] < smallestY) smallestY = coords[1];
                else if (coords[1] > biggestY) biggestY = coords[1];
            });


            this.visibleMap = [];

            console.log(smallestX,biggestX, smallestY,biggestY);

            for (let y = smallestY; y<=biggestY; y++) {
                this.visibleMap.push([]);
                for (let x = smallestX; x<=biggestX; x++) {
                    let row = this.visibleMap[this.visibleMap.length-1];
                    if (!coordinatesAreVisible(visibleTiles, [x,y])) row.push(0);
                    else row.push(map.tiles[x] && map.tiles[x][y] || 0);
                }
            }


            this.lastPosition = this.position.clone();
        }

        return this.visibleMap;
    }

    getTilesInRadius(xCenter, yCenter) {
        const tiles = [];
        const sqrRadius = this.tileRadius*this.tileRadius;
        for (let x = xCenter - this.tileRadius ; x <= xCenter; x++) {
            for (let y = yCenter - this.tileRadius ; y <= yCenter; y++) {
                // we don't have to take the square root, it's slow
                if ((x - xCenter)*(x - xCenter) + (y - yCenter)*(y - yCenter) <= sqrRadius) {
                    let xSym = xCenter - (x - xCenter);
                    let ySym = yCenter - (y - yCenter);
                    tiles.push( [x, y], [x, ySym], [xSym, y], [xSym, ySym])
                }
            }
        }
        return tiles;
    }

    centerOnMap(map) {
        const center = (map.tiles.length-1) *.5 * this.tileSize;
        this.position = new Vector2(center, center);
    }

    move(x,y) {
        this.position.move(x*this.tileSize, y*this.tileSize);
    }

    setRadius(radius) {
        this.radius = parseInt(radius);
        this.tileRadius = Math.ceil(this.radius/this.tileSize);
        this.lastPosition = null;
    }

}