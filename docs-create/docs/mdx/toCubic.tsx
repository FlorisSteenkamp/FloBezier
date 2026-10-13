import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { toCubic } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = toCubic;


// params
const ps = [[1,1], [10.53125,9.8125], [14.6875,3.34375]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');

    const params = [ps] as [number[][]]; 

    const ps_ = f(...params);

    drawBezier_(ps_.map(tc), true);

    return [{ result: ps_, params: [params] }];
}


function ToCubic() {
    return (
        <BezierCanvas
            functionName='toCubic'
            draw={draw}
            draggables={ps}
        />
    )
}


export { ToCubic }
