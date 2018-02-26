const isometricToTile = (wHalf, hHalf, x, y) => [
    (x / wHalf + y / hHalf) / 2,
    (y / hHalf - x / wHalf) / 2
];

export default isometricToTile;