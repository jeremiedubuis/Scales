// @flow
import api from './api';
import Renderer from './rendering/Renderer';
import StateHandler from './state/StateHandler';
import Loader from './state/Loader';
import configLoader from './configLoader';
import Dispatcher from './core/Dispatcher';

let time;
let prevTime;

const dispatcher = new Dispatcher();

type typeOptions = {
    frameRate: number
}

export default class Scales {
    frameRate: number;
    renderer: Renderer;
    stateHandler: StateHandler;

    constructor(canvas: HTMLCanvasElement, { frameRate = 25 } : typeOptions) {

        Scales.on('load', (config) => this.onLoad(canvas, frameRate, config));
        this.api = api(this);
        this.loader = new Loader();
        configLoader.load(this.api);

    }

    onLoad(canvas, frameRate, config) {
        time = prevTime = new Date().getTime();
        this.currentFrame = 0;
        this.frameRate = frameRate;
        this.stateHandler = new StateHandler(config);
        this.renderer = new Renderer(canvas, config);
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
            Scales.trigger('update', this.currentFrame);
        }

        requestAnimationFrame(this.update);
    }

    setFrame(currentFrame) {
        this.currentFrame = currentFrame;
        time = prevTime = new Date().getTime();
    }

    static on(str, cb) {
        dispatcher.on(str, cb);
    }

    static off(str, cb) {
        dispatcher.off(str, cb);
    }

    static trigger(str, params) {
        dispatcher.trigger(str,params);
    }

}