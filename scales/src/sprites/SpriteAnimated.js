import Sprite from './Sprite.js';

export default class SpriteAnimated extends Sprite {

    constructor(img, size: Array<number>, animations: Array<Object>) {
        super(img, size);
        this.animations = {};
        this.currentFrame = 0;
        this.lastRenderedFrame = 0;
        animations.forEach(this.addAnimation.bind(this));
    }

    addAnimation({name, coords}) {
        this.animations[name] = coords;
        if (!this.currentAnimation) this.currentAnimation = name;
    }

    setAnimation(name, gameFrame) {
        this.currentAnimation = name;
        this.currentFrame = 0;
        this.lastRenderedFrame = gameFrame;
    }

    render(c2d, vector2, gameFrame) {
        this.setFrameFromGameFrame(gameFrame);
        this.lastRenderedFrame = gameFrame;
        c2d.drawImage(
            this.img,
            this.animations[this.currentAnimation][this.currentFrame][0],
            this.animations[this.currentAnimation][this.currentFrame][1],
            this.size[0], this.size[1],
            vector2.x, vector2.y,
            this.size[0], this.size[1]
        );
    }

    setFrameFromGameFrame(gameFrame) {
        this.setAnimationFrame(gameFrame);
    }

    setAnimationFrame(frame) {

        let delta = frame-this.lastRenderedFrame;
        if (delta === 0) return;

        let animationMaxIndex = this.animations[this.currentAnimation].length-1;
        if (animationMaxIndex === 0) return this.currentFrame = 0;

        if (this.currentFrame + delta > animationMaxIndex) {
            this.currentFrame = this.recursion(this.currentFrame,delta, animationMaxIndex);
        } else {
            this.currentFrame += delta;
        }

    }

    recursion(currentFrame, delta, animationMaxIndex) {
        // + 1 to compensate index based
        delta = currentFrame + delta - (animationMaxIndex+1);
        currentFrame = 0;
        if (currentFrame + delta > animationMaxIndex) return this.recursion(currentFrame, delta, animationMaxIndex);
        return currentFrame + delta;
    }




}