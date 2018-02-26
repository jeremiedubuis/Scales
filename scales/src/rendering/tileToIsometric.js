import Vector2 from '../core/Vector2';
const tileToIsometric = (wHalf, hHalf, x, y) => new Vector2(
    (x-y) * wHalf,
    (y+x) * hHalf
);

export default tileToIsometric;