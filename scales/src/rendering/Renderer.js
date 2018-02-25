import Camera from './Camera';
import Vector2 from '../core/Vector2';

export default class Renderer {

    constructor(canvas) {
        this.camera = new Camera({canvas, renderPosition: new Vector2(canvas.width*.5, canvas.height*.5)});
        this.c2d = canvas.getContext('2d');
        this.canvasSize = [
            parseInt(canvas.getAttribute('width')),
            parseInt(canvas.getAttribute('height'))
        ];
    }

    update(currentFrame: number, state: Object) {
        this.c2d.clearRect(0, 0, ...this.canvasSize);
        this.xOffset = state.map.tileWidth * .5 * state.map.tiles.length;
        this.renderMap( state.map );
        this.renderFrames(currentFrame);
        state.gameObjects.forEach((go) => this.renderGameObject(state.map, go, currentFrame) );
    }

    renderMap(map) {
        const _activeMap = this.activeMap = this.camera.getVisibleTiles(map);


        for (let y=0, _length = _activeMap.length; y < _length; y++) {

            for (let x = 0, xLength = _activeMap[y].length; x<xLength; x++) {
                map.getTile(_activeMap[y][x])
                    .render(this.c2d, this.coordinatesToMapPosition(x, y, map));

            }

        }
    }

    renderFrames(currentFrame) {

        this.c2d.fillStyle = 'black';
        this.c2d.fillRect(0,0, 50, 30);
        this.c2d.fillStyle = 'white';
        this.c2d.fillText('frame:'+currentFrame, 10, 15);
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

    coordinatesToMapPosition(x,y,map) {
        return map.mapToScreenSpace(x, y, this.camera.position);
    }

}