import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { translate } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = translate;


// params
const ps = [[2,2], [6,9], [10,3], [13,7]];
const scalars = [
    { title: 'v[0]', val: 4, min: -6, max: 6, step: 0.1 },
    { title: 'v[1]', val: 1, min: -4, max: 4, step: 0.1 },
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const v = [scalars[0].val, scalars[1].val];

    const params = [ps, v] as [number[][], number[]];

    const drawSource = drawBezier(ctx, '#0f0', 'transparent');
    const drawResult = drawBezier(ctx, '#f00', 'transparent');

    const ps_ = f(...params);

    drawSource(ps.map(tc));
    drawResult(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}


function Translate() {
    return (
        <BezierCanvas
            functionName='translate'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    );
}


export { Translate }
