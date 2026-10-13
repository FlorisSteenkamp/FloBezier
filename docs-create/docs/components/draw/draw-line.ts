
/**
 * Draws a rectangle on the given canvas.
 * 
 * @param ctx 
 * @param p
 */
function drawLine(
        ctx: CanvasRenderingContext2D,
        strokeStyle?: string | undefined) {

    return (p1: number[], p2: number[]) => {

        const [[x1,y1], [x2,y2]] = [p1,p2];

        if (strokeStyle) { ctx.strokeStyle = strokeStyle; }
        
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        if (strokeStyle) { ctx.stroke(); }
    }
}


export { drawLine }
