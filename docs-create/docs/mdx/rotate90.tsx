import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { drawCoordinateCrossMid } from '../components/draw/draw-coordinate-cross';
import { rotate90 } from '../../../node/index';
import { transformCoordinatesMid } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesMid(width, height);
const f = rotate90;


// params (rotation is exactly about the origin, shown at the centre of the axes)
const ps = [[1,1], [2.5,3], [4.5,1.5], [6,2.5]];


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


function Rotate90() {
    return (
        <BezierCanvas
            functionName='rotate90'
            draw={draw}
            dontShowDraggableNote={true}
        />
    );
}


export { Rotate90 }
