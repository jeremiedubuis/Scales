// @flow
import api from './api';
import Renderer from './rendering/Renderer';
import StateHandler from './state/StateHandler';
import Loader from './state/Loader';

let time;
let prevTime;

type typeOptions = {
    frameRate: number
}

export default class Scales {
    frameRate: number;
    renderer: Renderer;
    stateHandler: StateHandler;

    constructor(canvas: HTMLCanvasElement, { frameRate = 25 } : typeOptions) {

        time = prevTime = new Date().getTime();
        this.currentFrame = 0;
        this.frameRate = frameRate;
        this.stateHandler = new StateHandler();
        this.renderer = new Renderer(canvas);
        this.loader = new Loader();
        this.api = api(this);
        this.update = this.update.bind(this);
        this.paused = true;

    }

    update() {
        if (this.paused) return;
        time = new Date().getTime();
        let deltaTime = time - prevTime;
        let deltaFrames = Math.floor(deltaTime * 0.001 * this.frameRate);
        if ( deltaFrames > 0 ) {
            this.currentFrame += deltaFrames;
            this.renderer.update(this.currentFrame, this.stateHandler.getState());
            prevTime = time;
        }

        requestAnimationFrame(this.update);
    }

}