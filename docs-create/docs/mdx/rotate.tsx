import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { rotate } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = rotate;


// params
const ps = [[5,1], [8,4], [11,2], [14,3]];
const scalars = [
    { title: 'θ', val: 0.35, min: 0, max: 0.7, step: 0.01 },
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const θ = scalars[0].val;

    const params = [ps, θ] as [number[][], number];

    const drawSource = drawBezier(ctx, '#0f0', 'transparent');
    const drawResult = drawBezier(ctx, '#f00', 'transparent');

    const ps_ = f(...params);

    drawSource(ps.map(tc));
    drawResult(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}


function Rotate() {
    return (
        <BezierCanvas
            functionName='rotate'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    );
}


export { Rotate }
