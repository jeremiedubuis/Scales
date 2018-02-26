import Camera from './Camera';
import Vector2 from '../core/Vector2';
import tileToIsometric from './tileToIsometric';
import isometricToTile from './isometricToTile';

import oval from './shapes/oval';


export default class Renderer {

    constructor(canvas, {config, tiles}) {

        this.canvas = canvas;
        this.tileSize = config.tiles.size;
        this.camera = new Camera({canvas, tileSize: this.tileSize});
        this.c2d = canvas.getContext('2d');
        this.canvasSize = [
            parseInt(canvas.getAttribute('width')),
            parseInt(canvas.getAttribute('height'))
        ];
    }

    update(currentFrame: number, state: Object) {
        this.c2d.clearRect(0, 0, ...this.canvasSize);
        this.xOffset = state.map.tileHalfWidth * state.map.tiles.length;
        this.renderMap( state.map );
        this.renderFrames(currentFrame);
        state.gameObjects.forEach((go) => this.renderGameObject(state.map, go, currentFrame) );
    }

    renderMap(map) {
        const _activeMap = this.activeMap = this.camera.getVisibleTiles(map);

        for (let y=0, _length = _activeMap.length; y < _length; y++) {
            for (let x = 0, xLength = _activeMap[y].length; x<xLength; x++) {
                map.getTile(_activeMap[y][x])
                   .render(this.c2d, this.coordinatesToMapPosition(x, y), this.xOffset);

            }

        }
        /**
        oval( this.c2d, this.canvas, x, y, this.camera.radius, this.camera.radius*.5, function(c2d) {
            c2d.fillStyle = 'red';
        } )**/

    }

    renderFrames(currentFrame) {

        this.c2d.fillStyle = 'rgba(0,0,0,.6)';
        this.c2d.fillRect(0,0, 50, 60);
        this.c2d.fillStyle = 'white';
        this.c2d.fillText('frame:'+currentFrame, 10, 15);
        this.c2d.fillText(
            'cam:'+Math.floor(this.camera.position.x / this.camera.tileSize)+';'+
            Math.floor(this.camera.position.y / this.camera.tileSize),
            10, 30
        );
    }

    renderGameObject(map, gameObject, frame) {
        if (this.isVisible(gameObject)) {
            gameObject.render(this.c2d, this.coordinatesToMapPosition(gameObject.position.x, gameObject.position.y, map), frame );
        }
    }

    isVisible(gameObject) {
        return true;
        return (gameObject.position.x >= this.camera.position.x-this.camera.position.radius &&
            gameObject.position.x<= this.camera.position.x+this.camera.position.radius+1) &&
            (gameObject.position.y >= this.camera.position.y-this.camera.position.radius &&
            gameObject.position.y<= this.camera.position.y+this.camera.position.radius+1);
    }

    coordinatesToMapPosition(x,y) {

        return tileToIsometric(
            this.tileSize*.5,
            this.tileSize*.25,
            x,
            y
        );
    }

}