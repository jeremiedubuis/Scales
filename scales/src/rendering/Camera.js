import Vector2 from '../core/Vector2';
type typeOptions = {
    position?: Vector2,
    canvas: HTMLElement,
    radius?: number
}

export default class Camera {
    position: Vector2;
    radius: number;
    visibleMap: Array<number>;

    constructor({ position = new Vector2(0,0), radius = 100 } : typeOptions) {
        this.position = position;
        this.radius = radius;
    }

    getVisibleTiles(map) {

        if (!this.lastPosition || !this.lastPosition.comparePosition(this.position)) {
            const startingTile = map.screenSpaceToMap(this.position.x-this.radius, this.position.y-this.radius*map.tileRatio);
            const endingTile = map.screenSpaceToMap(this.position.x+this.radius, this.position.y+this.radius*map.tileRatio);
            const startingX = Math.max(0, Math.ceil(startingTile.x));
            const endingX   = Math.min(Math.ceil(endingTile.x), map.tiles.length-1);
            const startingY = Math.max(0, Math.ceil(startingTile.y));
            const endingY   = Math.min(Math.ceil(endingTile.y), map.tiles[0].length-1);
            const visibleTiles = [];
            let _xLength;
            let _yLength;


            for (let localY = startingY; localY <= endingY; localY++) {

                visibleTiles.push([]);

                for (let localX = startingX; localX<=endingX; localX++) {

                    _yLength = visibleTiles.length-1;
                    _xLength = visibleTiles[_yLength].length-1;

                    if (typeof map.tiles[localY] !== "undefined" && typeof map.tiles[localY][localX]!== "undefined") {
                        visibleTiles[_yLength].push( map.tiles[localY][localX] );
                    } else {
                        visibleTiles[_yLength].push( 0 );
                    }

                }

            }

            this.lastPosition = this.position.clone();
            this.visibleMap = visibleTiles;
        }

        return this.visibleMap;
    }

    centerOnMap(map) {
    }

    move(x,y) {
        this.position.move(x, y);
    }

}