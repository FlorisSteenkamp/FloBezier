import { drawCircle } from './draw/draw-circle';
import { drawRect } from './draw/draw-rect';
//import { drawBezier } from './draw/draw-bezier';
import { drawFatline } from './draw/draw-fatline';
import { drawGeo } from './draw/draw-geo';
import { drawBeziers } from './get-pss';


const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

function draw(ctx: CanvasRenderingContext2D) {
    const dot_ = drawCircle(ctx, 5, undefined, '#00f');
    const box_ = drawRect(ctx, '#00f', '#00f');
    const fatline_ = drawFatline(ctx, '#ff0', '#ff02');
    const geo_ = drawGeo(ctx, '#f0f', '#f0f2');
    const beziers_ = drawBeziers(ctx);

    return { dot_, box_, fatline_, geo_, beziers_ };
} 


export { draw, ctx }
