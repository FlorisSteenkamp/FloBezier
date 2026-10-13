import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { lineToQuadratic } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = lineToQuadratic;


// params
const ps = [[1,1], [15.125,8]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps] as [number[][]];

    const ps_ = f(...params);
    
    drawBezier_(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}



function LineToQuadratic() {
    return (<>
        <BezierCanvas
            functionName='lineToQuadratic'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { LineToQuadratic }
