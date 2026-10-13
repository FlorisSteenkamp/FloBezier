import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { drawCircle } from '../components/draw/draw-circle';
import { cubicThroughPointGiven013 } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = cubicThroughPointGiven013;

// params
const ps = [[1,1], [10.53125,4.8125], [18,0.5]];
const p = [14.6875,3.34375];
const scalars = [
    { 
        title: 't', val: 0.75,
        min: 0, max: 1, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');
    const dot_ = drawCircle(ctx, '#00f', 'transparent');

    const params = [ps, p, scalars[0].val] as [number[][], number[], number];

    const ps_ = f(...params);

    drawBezier_(ps_.map(tc));
    dot_(tc(p), 10);

    return [{ result: ps_, params: [params] }];
}


function CubicThroughPointGiven013() {
    return (
        <BezierCanvas 
            functionName='cubicThroughPointGiven013'
            draw={draw}
            draggables={[ps[0], ps[1], ps[2], p]}
            scalars={scalars}
        />
    )
}


export { CubicThroughPointGiven013 }
