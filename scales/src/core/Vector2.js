export default class Vector2 {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    comparePosition(vector2 : Vector2) {
        if (vector2.x !== this.x || vector2.y !== this.y) return false;
    }

    move(x,y) {
        this.add(new Vector2(x,y));
    }

    add(vector2, newVector) {
        const v = newVector ? this.clone() : this;
        v.x += vector2.x;
        v.y += vector2.y;
        return v;
    }

    deduce(vector2, newVector) {
        const v = newVector ? this.clone() : this;
        v.x -= vector2.x;
        v.y -= vector2.y;
        return v;
    }

}