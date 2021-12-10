import { fromTo, reverse, toLength, translate } from 'flo-vector2d';
import { Fatline } from '../../../src/intersection/bezier3-intersection/debug.js';


function drawFatline(ctx: CanvasRenderingContext2D,
    strokeStyle: string | undefined,
    fillStyle: string | undefined) {

    return (fatline: Fatline) => {
        const { psBase, psMin, psMax } = fatline;
        const psBase_ = makeLong(psBase);
        const psMin_ = makeLong(psMin);
        const psMax_ = makeLong(psMax);

        if (strokeStyle) { ctx.strokeStyle = strokeStyle; }
        if (fillStyle) { ctx.fillStyle = fillStyle; }

        ctx.lineWidth = 0.7;
        ctx.beginPath(); 
        ctx.moveTo(psBase_[0][0], psBase_[0][1]); 
        ctx.lineTo(psBase_[1][0], psBase_[1][1]);
        //ctx.stroke();

        ctx.lineWidth = 0.5;
        ctx.beginPath(); 
        ctx.lineTo(psMin_[0][0], psMin_[0][1]); 
        ctx.lineTo(psMin_[1][0], psMin_[1][1]);
        //ctx.stroke();

        //ctx.beginPath(); 
        ctx.lineTo(psMax_[1][0], psMax_[1][1]);
        ctx.lineTo(psMax_[0][0], psMax_[0][1]); 
        //ctx.stroke();

        if (strokeStyle) {
            //ctx.stroke();
        }
        if (fillStyle) {
            ctx.fill();
        }
    }
}


function makeLong(ps: number[][]) {
    const S = ps[0];
    const E = ps[1];

    const v = fromTo(S, E);
    const vL = toLength(v, 2000);  // make looooong(ish)

    const lS = translate(S,vL);
    const lE = translate(S,reverse(vL));

    return [lS,lE];
}


export { drawFatline }
