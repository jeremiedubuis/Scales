export default (c2d, canvas, position, width, height, styleFunction) =>{

    const largest = Math.max(width, height);
    const smallest = Math.min(width, height);

    const ratio = largest/smallest;

    c2d.save();

    if (styleFunction) styleFunction(c2d);

    // translate context
    c2d.translate(canvas.width / ratio, canvas.height / ratio);

    // scale context horizontally
    c2d.scale(ratio, 1);

    // draw circle which will be stretched into an oval
    c2d.beginPath();
    c2d.arc(position.x, position.y, largest, 0, 2 * Math.PI, false);
    console.log(position.x, position.y, largest, 0, 2 * Math.PI, false)
    c2d.fill();
    // restore to original state
    c2d.restore();

}