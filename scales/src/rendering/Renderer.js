import Camera from './Camera';
import tileToIsometric from './tileToIsometric';
import worldToScreen from './isometricToTile';
import { ease, easeInOutQuad } from './easing';

export default class Renderer {

    constructor(canvas, {config, tiles}) {

        this.tileSize = config.tiles.size;
        this.camera = new Camera({canvas, tileSize: this.tileSize});
        this.c2d = canvas.getContext('2d');
        this.canvasSize = [
            parseInt(canvas.getAttribute('width')),
            parseInt(canvas.getAttribute('height'))
        ];
    }

    update(currentFrame: number, state: Object) {
        console.log('=============================')
        console.log('frame: '+currentFrame)
        console.log('=============================')
        this.c2d.clearRect(0, 0, ...this.canvasSize);
        this.xOffset = state.map.tileHalfWidth * state.map.tiles.length;
        this.renderMap( state.map );
        this.renderShadowOval(currentFrame);
        this.renderFrames(currentFrame);
        state.gameObjects.forEach((go) => this.renderGameObject(state.map, go, currentFrame) );
    }

    renderMap(map) {
        const _activeMap = this.camera.getVisibleTiles(map);

        for (let y=0, _length = _activeMap.tiles.length; y < _length; y++) {
            for (let x = 0, xLength = _activeMap.tiles[y].length; x<xLength; x++) {
                map.getTile(_activeMap.tiles[y][x])
                   .render(this.c2d, this.tileToScreen(x-_activeMap.deltaX, y-_activeMap.deltaY), this.xOffset);
            }

        }
    }

    renderShadowOval(currentFrame) {
        this.c2d.save();
        this.c2d.globalCompositeOperation = 'destination-atop';

        const halfRadius = this.camera.radius*.5;
        const x = this.xOffset+this.tileSize*.5;
        const y = halfRadius + this.tileSize;

        this.c2d.ellipse(
            x, //x
            y,// y
            this.camera.radius, // radius X
            halfRadius, // radius Y
            0 , 0, 2 * Math.PI
        );
        //c2d.fillStyle = 'rgba(100,100,100,.5)';
        this.c2d.fill();
        this.c2d.restore();

        const shadowWidth = 6+ease(currentFrame, 50, 4, 'easeInOutQuad', true);

        this.renderShadowOvalShadow(4, x, y, shadowWidth, halfRadius)

    }

    renderShadowOvalShadow(rings, x, y, ringSize, halfRadius){
        const opacityRatio = .8 / rings;
        const totalRingSize = rings * ringSize;
        let halfRingSize = ringSize * .5;
        this.c2d.lineWidth = ringSize;

        for (let i = rings; i>0; i--) {
            this.c2d.beginPath();
            halfRingSize =  i * ringSize * .5;

            let ringWidth = totalRingSize - i*ringSize;
            this.c2d.ellipse(
                x,
                y,
                this.camera.radius - ringWidth, // radius X
                halfRadius - ringWidth*.5 , // radius Y
                0 , 0, 2 * Math.PI
            );

            let opacity = (Math.round(i* opacityRatio * 10) / 10 ).toString();
            this.c2d.strokeStyle = 'rgba(0,0,0,'+opacity+')';
            this.c2d.stroke();
        }

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
            gameObject.render(this.c2d, this.worldToScreen(gameObject.position.x, gameObject.position.y), frame );
        }
    }

    isVisible(gameObject) {
        return true;
        return (gameObject.position.x >= this.camera.position.x-this.camera.position.radius &&
            gameObject.position.x<= this.camera.position.x+this.camera.position.radius+1) &&
            (gameObject.position.y >= this.camera.position.y-this.camera.position.radius &&
            gameObject.position.y<= this.camera.position.y+this.camera.position.radius+1);
    }

    tileToScreen(x,y) {
        return tileToIsometric(
            this.tileSize*.5,
            this.tileSize*.25,
            x,
            y
        );
    }

    worldToScreen(x,y) {
        return worldToScreen(
            this.tileSize*.5,
            this.tileSize*.25,
            x,
            y
        );
    }

}