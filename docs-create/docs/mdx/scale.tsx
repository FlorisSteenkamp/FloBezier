import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { scale } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = scale;


// params
const ps = [[3,2], [6,8], [10,3], [13,6]];
const scalars = [
    { title: 's', val: 1.1, min: 0.2, max: 1.4, step: 0.01 },
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const s = scalars[0].val;

    const params = [ps, s] as [number[][], number];

    const drawSource = drawBezier(ctx, '#0f0', 'transparent');
    const drawResult = drawBezier(ctx, '#f00', 'transparent');

    const ps_ = f(...params);

    drawSource(ps.map(tc));
    drawResult(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}


function Scale() {
    return (
        <BezierCanvas
            functionName='scale'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    );
}


export { Scale }
