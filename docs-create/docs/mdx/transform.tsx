import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transform } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = transform;


// params
const ps = [[2,2], [6,9], [12,3], [16,7]];
const scalars = [
    { title: 'a', val: 1, min: -2, max: 2, step: 0.01 },
    { title: 'b', val: 0, min: -2, max: 2, step: 0.01 },
    { title: 'c', val: 0, min: -8, max: 8, step: 0.1 },
    { title: 'd', val: 0, min: -2, max: 2, step: 0.01 },
    { title: 'e', val: 1, min: -2, max: 2, step: 0.01 },
    { title: 'f', val: 0, min: -8, max: 8, step: 0.1 },
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const [a, b, c, d, e, f_] = scalars.map(s => s.val);
    const m = [[a, b, c], [d, e, f_]];

    const params = [ps, m] as [number[][], number[][]];

    const drawSource = drawBezier(ctx, '#0f0', 'transparent');
    const drawResult = drawBezier(ctx, '#f00', 'transparent');

    const ps_ = f(...params);

    drawSource(ps.map(tc));
    drawResult(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}


function Transform() {
    return (
        <BezierCanvas
            functionName='transform'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    );
}


export { Transform }
