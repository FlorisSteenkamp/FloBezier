import { drawCircle } from './draw/draw-circle.js';
import { drawRect } from './draw/draw-rect.js';
import { drawFatline } from './draw/draw-fatline.js';
import { drawGeo } from './draw/draw-geo.js';
import { drawBeziers } from './get-pss/get-pss.js';
import { drawHybridPoly } from './draw/draw-hybrid-poly.js';
import { drawBezier } from './draw/draw-bezier.js';


const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

function draw(ctx: CanvasRenderingContext2D) {
    const dot_ = drawCircle(ctx, 5, undefined, '#00f');
    const box_ = drawRect(ctx, '#00f', '#00f');
    const fatline_ = drawFatline(ctx, '#ff0', '#ff02');
    const geo_ = drawGeo(ctx, '#f0f', '#f0f2');
    const beziers_ = drawBeziers(ctx);
    const hybridPoly_ = drawHybridPoly(ctx, '#f0f', '#f0f2', '#ff0', '#ff02');

    const drawBezier_ = drawBezier(ctx, '#f00', undefined, 0.5);

    return { 
        dot_, box_, fatline_, geo_, beziers_, hybridPoly_,
        drawBezier_
    };
} 


export { draw, ctx }
