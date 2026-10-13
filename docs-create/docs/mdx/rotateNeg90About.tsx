import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { drawCircle } from '../components/draw/draw-circle';
import { rotateNeg90About } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = rotateNeg90About;


// params
const ps = [[7,4], [9,9], [12,4], [14,7]];
const center = [10,6];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const params = [ps, center] as [number[][], number[]];

    const drawSource = drawBezier(ctx, '#0f0', 'transparent');
    const drawResult = drawBezier(ctx, '#f00', 'transparent');

    const ps_ = f(...params);

    drawSource(ps.map(tc));
    drawResult(ps_.map(tc));
    drawCircle(ctx, '#00f', 'transparent')(tc(center), 5);

    return [{ result: ps_, params: [params] }];
}


function RotateNeg90About() {
    return (
        <BezierCanvas
            functionName='rotateNeg90About'
            draw={draw}
            draggables={[...ps, center]}
        />
    );
}


export { RotateNeg90About }
