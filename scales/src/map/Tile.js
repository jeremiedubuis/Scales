import Sprite from '../sprites/Sprite';
import Vector2 from '../core/Vector2';
let tileIndex = 0;


export default class Tile {

    index: number;
    size: Array<number>;
    sprite: Sprite;

    constructor(sprite : Sprite) {
        this.index = tileIndex++;
        this.sprite = sprite;
    }

    render(c2d,vector2: Vector2) {
        this.sprite.render(c2d, vector2);
    }

    get width() {
        return this.sprite.size[0];
    }

    get height() {
        return this.sprite.size[1];
    }

}