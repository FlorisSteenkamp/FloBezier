import { drawCircle } from './draw-circle';


function drawBezier(
        ctx: CanvasRenderingContext2D,
        strokeStyle: string,
        fillStyle: string,
        dotRadius: number) {

    const dot_ = drawCircle(ctx, dotRadius, strokeStyle, strokeStyle);

    return (
            ps: number[][],
            inclDots = true,
            inclLines = true) => {

        if (ps.length === 4) {
            const [p0,p1,p2,p3] = ps;
            const [x0,y0] = p0;
            const [x1,y1] = p1;
            const [x2,y2] = p2;
            const [x3,y3] = p3;

            ctx.strokeStyle = strokeStyle;
            ctx.fillStyle = fillStyle;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x0,y0);
            ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
            ctx.stroke();

            if (inclLines) {
                ctx.save();
                ctx.lineWidth = 0.5;
                ctx.beginPath(); 
                ctx.moveTo(x0,y0); 
                ctx.lineTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.lineTo(x3,y3);
                ctx.stroke();
                ctx.restore();
            }

            if (inclDots) {
                dot_(p0); dot_(p1); dot_(p2); dot_(p3);
            }
        } else if (ps.length === 3) {
            const [p0,p1,p2] = ps;
            const [x0,y0] = p0;
            const [x1,y1] = p1;
            const [x2,y2] = p2;

            ctx.strokeStyle = strokeStyle;
            ctx.fillStyle = fillStyle;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x0,y0);
            ctx.quadraticCurveTo(x1, y1, x2, y2);
            ctx.stroke();

            if (inclLines) {
                ctx.save();
                ctx.lineWidth = 0.5;
                ctx.beginPath(); 
                ctx.moveTo(x0,y0); 
                ctx.lineTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.stroke();
                ctx.restore();
            }

            if (inclDots) {
                dot_(p0); dot_(p1); dot_(p2);
            }
        } else if (ps.length === 2) {
            const [p0,p1] = ps;
            const [x0,y0] = p0;
            const [x1,y1] = p1;

            ctx.strokeStyle = strokeStyle;
            ctx.fillStyle = fillStyle;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x0,y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();

            if (inclLines) {
                ctx.save();
                ctx.lineWidth = 0.5;
                ctx.beginPath(); 
                ctx.moveTo(x0,y0); 
                ctx.lineTo(x1,y1);
                ctx.stroke();
                ctx.restore();
            }

            if (inclDots) {
                dot_(p0); dot_(p1);
            }
        }
    }
}


export { drawBezier }
