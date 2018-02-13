import Camera from './Camera';

export default class Renderer {

    constructor(canvas) {
        this.camera = new Camera({});
        this.c2d = canvas.getContext('2d');
        this.canvasSize = [
            parseInt(canvas.getAttribute('width')),
            parseInt(canvas.getAttribute('height'))
        ];
    }

    update(currentFrame: number, state: Object) {
        this.c2d.clearRect(0, 0, ...this.canvasSize);
        this.renderMap( state.map );
        this.renderFrames(currentFrame);
        state.gameObjects.forEach((go) => this.renderGameObject(state.map, go, currentFrame) );
    }

    renderMap(map) {
        var _activeMap = this.activeMap = this.camera.getVisibleTiles(map);

        for (let y=0, _length = _activeMap.length; y < _length; y++) {

            for (let x = 0; x<_length; x++) {

                map.getTile(_activeMap[y][x])
                    .render(this.c2d, map.mapToScreenSpace(x, y));


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
            gameObject.render(this.c2d, map.mapToScreenSpace(gameObject.position.x, gameObject.position.y), frame );
        }
    }

    isVisible(gameObject) {
        return true;
        return (gameObject.position.x >= this.camera.position.x-this.camera.position.radius &&
            gameObject.position.x<= this.camera.position.x+this.camera.position.radius+1) &&
            (gameObject.position.y >= this.camera.position.y-this.camera.position.radius &&
            gameObject.position.y<= this.camera.position.y+this.camera.position.radius+1);
    }

}