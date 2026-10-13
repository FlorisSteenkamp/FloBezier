import * as React from 'react';
import { evaluate, generateSelfIntersecting } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = generateSelfIntersecting;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875]];
const ts = [0.25, 0.75];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const dot_1 = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,3);
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps[0],ps[1],ps[2],ts] as [number[], number[], number[], number[]];

    const ps_ = f(...params);
    
    drawBezier_(ps_.map(tc));

    ts.map(t => dot_1(tc(evaluate(ps_, ts[0]))));
    ts.map(t => dot_1(tc(evaluate(ps_, ts[1]))));

    return [{ result: ps_, params: [params] }];
}



function GenerateSelfIntersecting() {
    return (<>
        <BezierCanvas
            functionName='generateSelfIntersecting'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { GenerateSelfIntersecting }
