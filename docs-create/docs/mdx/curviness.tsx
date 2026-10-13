import * as React from 'react';
import { evaluate, curviness } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = curviness;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [11,8]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps] as [number[][]];

    const c = f(...params);
    
    drawBezier_(ps.map(tc));

    return [{ result: c, params: [params] }];
}


function Curviness() {
    return (<>
        <BezierCanvas
            functionName='curviness'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { Curviness }
