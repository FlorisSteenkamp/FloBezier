
/**
 * Draws a 'dot' on the given canvas.
 * 
 * @param ctx 
 * @param p
 */
function drawRect(
        ctx: CanvasRenderingContext2D,
        strokeStyle: string | undefined,
        fillStyle: string | undefined) {

    return (rect: number[][]) => {

        const [[x1,y1], [x2,y2]] = rect;

        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;

        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x1,y2);
        ctx.lineTo(x2,y2);
        ctx.lineTo(x2,y1);
        ctx.lineTo(x1,y1);

        if (strokeStyle) {
            ctx.stroke();
        }
        if (fillStyle) {
            ctx.fill();
        }
    }
}


export { drawRect }
