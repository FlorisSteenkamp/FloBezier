import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { evaluate, bezierSelfIntersection } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = bezierSelfIntersection;

// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const dot_1 = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps] as [number[][]];

    const ts = f(...params);
    
    drawBezier_(ps.map(tc));
    
    ts.map(t => dot_1(tc(evaluate(ps, t))));

    return [{ result: ts, params: [params] }];
}



function BezierSelfIntersection() {
    return (<>
        <BezierCanvas
            functionName='bezierSelfIntersection'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { BezierSelfIntersection }
