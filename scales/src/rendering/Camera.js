import Vector2 from '../core/Vector2';
type typeOptions = {
    position?: Vector2,
    radius?: number
}

export default class Camera {
    position: Vector2;
    radius: number;
    visibleMap: Array<number>;

    constructor({ position = new Vector2(0,0), radius = 4 } : typeOptions) {
        this.position = position;
        this.radius = radius;
    }

    getVisibleTiles(map) {
        if (!this.lastPosition || !this.lastPosition.comparePosition(this.position)) {
            const startingX = this.position.x-this.radius;
            const endingX   = this.position.x+this.radius;
            const startingY = this.position.y-this.radius;
            const endingY   = this.position.y+this.radius;
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

    move(x,y) {
        this.position.move(x, y);
    }

}