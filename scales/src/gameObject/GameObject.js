import Vector2 from '../core/Vector2';

export default class GameObject {

    constructor(id, sprite) {
        this.id = id;
        this.sprite = sprite;
        if (this.sprite) this.sprite.lastRenderedFrame = 0;
    }

    setPosition(x,y) {
        if (!this.position) this.position = new Vector2(x,y);
        else {
            this.position.x = x;
            this.position.y = y;
        }
    }

    render(c2d, offset,frame) {

        if (!this.sprite) {
            c2d.arc( offset[0]+ 15, offset[0] + 15, 10, 0, 2*Math.PI );
            c2d.fill();
        } else {
            this.sprite.render(c2d, offset, frame);
        }

    }

}