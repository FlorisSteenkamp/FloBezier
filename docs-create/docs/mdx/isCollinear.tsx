import * as React from 'react';
import { evaluate, isCollinear } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = isCollinear;

// params
const ps = [[1,1], [2,2], [3,3], [4,4]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps] as [number[][]];

    const r = f(...params);
    
    drawBezier_(ps.map(tc));

    return [{ result: r, params: [params] }];
}



function IsCollinear() {
    return (<>
        <BezierCanvas
            functionName='isCollinear'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { IsCollinear }
