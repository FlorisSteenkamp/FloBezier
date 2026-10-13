import * as React from 'react';
import { evaluate, furthestPointOnBezier } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = furthestPointOnBezier;


// params
const ps = [[7,1], [5.125,8], [15.375,0.875], [5.375,3.325]];
const p = [5,1.5];


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



function FurthestPointOnBezier() {
    return (<>
        <BezierCanvas
            functionName='furthestPointOnBezier'
            draw={draw}
            draggables={[...ps, p]}
        />
    </>)
}



export { FurthestPointOnBezier }
