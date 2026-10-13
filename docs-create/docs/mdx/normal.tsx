import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { evalDeCasteljau, normal } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { translate } from 'flo-vector2d';
import { scale } from '../components/fs/scale';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = normal;


// params
const ps = [[10,8.5], [17,7.3], [10.6,4.65], [13,1.5]];
const scalars = [
    { 
        title: 'length', val: 0.33,
        min: 0, max: 1, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const t = scalars[0].val;
    const params = [ps, t] as [number[][], number];
    const drawBezier1 = drawBezier(ctx, '#f00', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#00f', 'transparent');
    const dot_ = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);

    const n = f(...params);
    const p = evalDeCasteljau(ps, t);

    drawBezier1(ps.map(tc));
    dot_(tc(p));

    const line = [p, translate(scale(1)(n), p)];

    drawBezier2(line.map(tc));

    return [{ result: n, params: [params] }];
}


function Normal() {
    return (
        <BezierCanvas
            functionName='normal'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    )
}


export { Normal }
