// @flow
import Vector2 from '../core/Vector2';

export default class Sprite {

    constructor(img, size: Array<number>, position: Array<number>) {
        this.img = img;
        this.size = size;
        if (position) this.position = new Vector2(...position);
    }

    render(c2d, vector2, xOffset = 0) {
        c2d.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            this.size[0],
            this.size[1],
            xOffset+vector2.x, vector2.y,
            this.size[0],
            this.size[1]
        );
    }

}