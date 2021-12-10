import { settings } from '../settings.js';
import { drawCircle } from './draw-circle.js';


const { tcml } = settings;


interface HybridPoly {
    /** first point of hybrid quadratic */
    dH0: { dMin: number; dMax: number; };
    /** mid point of hybrid quadratic - start */
    dH10: { dMin: number; dMax: number; };
    /** mid point of hybrid quadratic - end */
    dH11: { dMin: number; dMax: number; };
    /** last point of hybrid quadratic */
    dH2: { dMin: number; dMax: number; };
    dMin: number;
    dMax: number;
}


function drawHybridPoly(
        ctx: CanvasRenderingContext2D,
        strokeStyleG: string | undefined,
        fillStyleG: string | undefined,
        strokeStyleF: string | undefined,
        fillStyleF: string | undefined) {

    const dot1_ = drawCircle(ctx, 5, '#505', '#505');
    const dot2_ = drawCircle(ctx, 5, '#505', '#505');

    return (hybridPoly: HybridPoly) => {
        const { dH0, dH10, dH11, dH2, dMin, dMax } = hybridPoly;

        // GEO

        const vals = [
            dH0.dMin, dH0.dMax,
            dH10.dMin, dH10.dMax,
            dH11.dMin, dH10.dMax,
            dH2.dMin, dH2.dMax,
            dMin, dMax
        ];
        const max = Math.max(...vals.map(v => Math.abs(v)));

        const scaleY = 2**-(Math.trunc(Math.log2(max*4)));

        const dH1min = Math.min(dH10.dMin, dH11.dMin);
        const dH1max = Math.max(dH10.dMax, dH11.dMax);

        if (strokeStyleG) { ctx.strokeStyle = strokeStyleG; }
        if (fillStyleG) { ctx.fillStyle = fillStyleG; }
        
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        const ps = [
            tcml([0,   scaleY*dH0.dMax]),
            tcml([0.5, scaleY*dH1max]),
            tcml([1,   scaleY*dH2.dMax]),
            tcml([1,   scaleY*dH2.dMin]),
            tcml([0.5, scaleY*dH1min]),
            tcml([0,   scaleY*dH0.dMin]),
        ] as [number, number][];
        ctx.moveTo(...ps[0]);
        ctx.quadraticCurveTo(...ps[1], ...ps[2]); 
        ctx.lineTo(...ps[3]);
        ctx.quadraticCurveTo(...ps[4], ...ps[5]); 

        if (strokeStyleG) { ctx.stroke(); }
        if (fillStyleG) { ctx.fill(); }

        // FAT LINE
        if (strokeStyleF) { ctx.strokeStyle = strokeStyleF; }
        if (fillStyleF) { ctx.fillStyle = fillStyleF; }
        
        const pF1 = tcml([0, 0]) as [number, number];
        const pF2 = tcml([1, 0]) as [number, number];
        const psF = [
            tcml([0, scaleY*dMax]),
            tcml([1, scaleY*dMax]),
            tcml([1, scaleY*dMin]),
            tcml([0, scaleY*dMin])
        ] as [number, number][];
        ctx.lineWidth = 0.5;
        ctx.beginPath(); 
        ctx.moveTo(...psF[0]); 
        ctx.lineTo(...psF[1]);
        ctx.lineTo(...psF[2]);
        ctx.lineTo(...psF[3]);
        if (strokeStyleF) { ctx.stroke(); }
        if (fillStyleF) { ctx.fill(); }

        ctx.lineWidth = 0.3;
        ctx.beginPath(); 
        ctx.moveTo(...pF1); 
        ctx.lineTo(...pF2); 
        ctx.stroke();

        if (strokeStyleG) { ctx.strokeStyle = strokeStyleG; }
        if (fillStyleG) { ctx.fillStyle = fillStyleG; }

        //if (inclLines) {
            ctx.lineWidth = 0.5;
            ctx.beginPath(); 
            ctx.moveTo(...ps[0]); 
            ctx.lineTo(...ps[1]);
            ctx.lineTo(...ps[2]);
            ctx.stroke();

            ctx.beginPath(); 
            ctx.moveTo(...ps[3]); 
            ctx.lineTo(...ps[4]);
            ctx.lineTo(...ps[5]);
            ctx.stroke();
        //}

        dot1_(ps[0]);
        dot1_(ps[1]);
        dot1_(ps[2]);
        dot2_(ps[3]);
        dot2_(ps[4]);
        dot2_(ps[5]);
    }
}



export { drawHybridPoly }
