import { Fatline } from '../../../src/intersection/bezier3-intersection/debug';
import { fromTo, reverse, toLength, translate } from 'flo-vector2d';


function drawCross1(ctx: CanvasRenderingContext2D,
    strokeStyle: string | undefined,
    fillStyle: string | undefined) {

    return (p: number[]) => {
        const [x,y] = p;

        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;

        const s = 10;

        ctx.lineWidth = 0.7;
        ctx.beginPath(); 
        ctx.moveTo(x-s, y); 
        ctx.lineTo(x+s, y); 
        ctx.stroke();

        ctx.beginPath(); 
        ctx.moveTo(x, y-s); 
        ctx.lineTo(x, y+s);
        ctx.stroke();

        if (strokeStyle) {
            //ctx.stroke();
        }
        if (fillStyle) {
            //ctx.fill();
        }
    }
}


export { drawCross1 }
