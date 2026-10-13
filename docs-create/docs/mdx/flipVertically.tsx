import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { drawCoordinateCrossMid } from '../components/draw/draw-coordinate-cross';
import { flipVertically } from '../../../node/index';
import { transformCoordinatesMid } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesMid(width, height);
const f = flipVertically;


// params (reflection is about the x-axis, shown at the centre of the axes)
const ps = [[-8,1], [-3,5], [3,2], [8,4]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    drawCoordinateCrossMid(ctx);

    const params = [ps] as [number[][]];

    const drawSource = drawBezier(ctx, '#0f0', 'transparent');
    const drawResult = drawBezier(ctx, '#f00', 'transparent');

    const ps_ = f(...params);

    drawSource(ps.map(tc));
    drawResult(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}


function FlipVertically() {
    return (
        <BezierCanvas
            functionName='flipVertically'
            draw={draw}
            dontShowDraggableNote={true}
        />
    );
}


export { FlipVertically }
