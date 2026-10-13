import * as React from 'react';
import { evaluate, closestPointOnBezier } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = closestPointOnBezier;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];
const p = [7,8];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const dot_1 = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#ff0', 'transparent');

    const params = [ps,p] as [number[][], number[]];

    const r = f(...params);
    const { p: cp, t, d } = r;
    
    drawBezier_(ps.map(tc));

    drawBezier2([p,cp].map(tc));
    
    dot_1(tc(evaluate(ps, t)));

    return [{ result: r, params: [params] }];
}



function ClosestPointOnBezier() {
    return (<>
        <BezierCanvas
            functionName='closestPointOnBezier'
            draw={draw}
            draggables={[...ps, p]}
        />
    </>)
}



export { ClosestPointOnBezier }
