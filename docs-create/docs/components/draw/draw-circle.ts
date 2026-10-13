
/**
 * Draws a 'dot' on the given canvas.
 * 
 * @param ctx 
 * @param p
 */
function drawCircle(
        ctx: CanvasRenderingContext2D,
        strokeStyle: string,
        fillStyle: string) {
            
    return (p: number[], radius: number) => {
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.arc(p[0], p[1], radius, 0, 2*Math.PI);
        
        if (strokeStyle) {
            ctx.stroke();
        }
        if (fillStyle) {
            ctx.fill();
        }
    }
}


export { drawCircle }
