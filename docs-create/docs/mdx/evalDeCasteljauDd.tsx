import * as React from 'react';
import { evaluate, evalDeCasteljauDd } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { eEstimate } from 'big-float-ts';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = evalDeCasteljauDd;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];
const scalars = [
    { 
        title: 't', val: 0.4,
        min: 0, max: 1, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const dot_1 = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const t = scalars[0].val;
    const params = [ps,[0,t]] as [number[][],number[]];

    const p = f(...params);
    
    drawBezier_(ps.map(tc));
    dot_1(tc(p.map(eEstimate)));

    return [{ result: p, params: [params] }];
}



function EvalDeCasteljauDd() {
    return (<>
        <BezierCanvas
            functionName='evalDeCasteljauDd'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    </>)
}



export { EvalDeCasteljauDd }
