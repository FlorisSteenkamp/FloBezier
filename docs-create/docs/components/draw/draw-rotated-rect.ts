
/**
 * Draws a 'dot' on the given canvas.
 * 
 * @param ctx 
 * @param p
 */
function drawRotatedRect(
        ctx: CanvasRenderingContext2D,
        strokeStyle: string | undefined,
        fillStyle: string | undefined) {

    return (rect: number[][]) => {

        const [[x1,y1], [x2,y2], [x3,y3], [x4,y4]] = rect;

        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.beginPath();

        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineTo(x3,y3);
        ctx.lineTo(x4,y4);
        ctx.lineTo(x1,y1);

        if (strokeStyle) {
            ctx.stroke();
        }
        if (fillStyle) {
            ctx.fill();
        }
    }
}


export { drawRotatedRect }
