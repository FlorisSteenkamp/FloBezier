import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { getBoundingBoxTight } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawRotatedRect } from '../components/draw/draw-rotated-rect';
import { drawBezier } from '../components/draw/draw-bezier';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getBoundingBoxTight;

// params
const ps = [[1,1], [5.78125,7.21875], [11.8125,1.3125], [6.21875,6.21875]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawRotatedRect_ = drawRotatedRect(ctx, '#ff0', undefined);
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');

    const params = [ps] as [number[][]];

    const box = f(...params);

    drawRotatedRect_(box.map(tc));
    drawBezier_(ps.map(tc));

    return [{ result: box, params: [params] }];
}


function GetBoundingBoxTight() {
    return (
        <BezierCanvas
            functionName='getBoundingBoxTight'
            draw={draw}
            draggables={ps}
        />
    )
}


export { GetBoundingBoxTight }
