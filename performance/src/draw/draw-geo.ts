import { drawCircle } from "./draw-circle.js";


function drawGeo(
    ctx: CanvasRenderingContext2D,
    strokeStyle: string | undefined,
    fillStyle: string | undefined) {

    const dot_ = drawCircle(ctx, 2, strokeStyle, strokeStyle);

    return (hq: number[][]) => {
        const [[x0,y0], [x11,y11], [x12,y12], [x2,y2]] = hq;

        if (strokeStyle) { ctx.strokeStyle = strokeStyle; }
        if (fillStyle) { ctx.fillStyle = fillStyle; }

        ctx.lineWidth = 0.5;
        ctx.beginPath(); 
        ctx.moveTo(x0, y0); 
        ctx.quadraticCurveTo(x11, y11, x2, y2);
        ctx.quadraticCurveTo(x12, y12, x0, y0);

        if (strokeStyle) {
            //ctx.stroke();
        }
        if (fillStyle) {
            ctx.fill();
        }

        dot_([x11,y11]);
        dot_([x12,y12]);
    }
}


export { drawGeo }
