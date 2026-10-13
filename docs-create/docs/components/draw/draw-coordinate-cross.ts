
/**
 * Cross is in middle
 * @param ctx 
 */
function drawCoordinateCrossMid(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    ctx.strokeStyle = '#eee';
    ctx.beginPath();
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.stroke();
}


/**
 * Cross is at Bottom left
 * @param ctx 
 */
 function drawCoordinateCrossBL(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    //ctx.strokeStyle = '#eee';
    //ctx.beginPath();
    //ctx.moveTo(0, 0);
    //ctx.lineTo(0, height);
    //ctx.stroke();
    //ctx.beginPath();
    //ctx.moveTo(0, height/2);
    //ctx.lineTo(width, height/2);
    //ctx.stroke();
}


export { drawCoordinateCrossMid, drawCoordinateCrossBL }
