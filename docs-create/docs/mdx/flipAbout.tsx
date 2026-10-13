import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { drawLine } from '../components/draw/draw-line';
import { flipAbout } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = flipAbout;


// params
const ps = [[5,6], [8,10], [11,5], [14,8]];
const p1 = [3,2];
const p2 = [16,9];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const params = [ps, p1, p2] as [number[][], number[], number[]];

    const drawSource = drawBezier(ctx, '#0f0', 'transparent');
    const drawResult = drawBezier(ctx, '#f00', 'transparent');

    const ps_ = f(...params);

    // the reflection axis
    drawLine(ctx, '#88f')(tc(p1), tc(p2));

    drawSource(ps.map(tc));
    drawResult(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}


function FlipAbout() {
    return (
        <BezierCanvas
            functionName='flipAbout'
            draw={draw}
            draggables={[...ps, p1, p2]}
        />
    );
}


export { FlipAbout }
