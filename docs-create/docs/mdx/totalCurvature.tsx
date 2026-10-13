import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawPartialBezier } from '../components/draw/draw-partial-bezier';
import { totalCurvature } from '../../../node/index';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = totalCurvature;


// params
const ps = [[1,1], [5.78125,7.21875], [11.8125,1.3125], [6.21875,6.21875]];
const scalars = [
    { 
        title: 't start', val: 0,
        min: 0, max: 1, step: 0.01
    },
    { 
        title: 't end', val: 1,
        min: 0, max: 1, step: 0.01
    },
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');
    const drawPartialBezier_ = drawPartialBezier(ctx, '#0f0', 'transparent');

    const params = [ps, [scalars[0].val, scalars[1].val]] as [number[][],number[]];

    const r = f(...params);

    drawBezier_(ps.map(tc));
    drawPartialBezier_(ps.map(tc), [scalars[0].val, scalars[1].val], false, false);

    return [{ result: r, params: [params] }];
}


function TotalCurvature() {
    return (
        <BezierCanvas
            functionName='totalCurvature'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    )
}


export { TotalCurvature }
