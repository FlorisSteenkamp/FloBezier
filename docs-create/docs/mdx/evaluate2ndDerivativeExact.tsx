import * as React from 'react';
import { evalDeCasteljau, evaluate, evaluate2ndDerivativeExact } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { translate } from 'flo-vector2d';
import { scale } from '../components/fs/scale';
import { eEstimate } from 'big-float-ts';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = evaluate2ndDerivativeExact;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];
const scalars = [
    { 
        title: 't', val: 0.75,
        min: 0, max: 1, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const dot_1 = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#00f', 'transparent');
    
    const t = scalars[0].val;
    const params = [ps,t] as [number[][],number];

    const n = f(...params);
    const p = evalDeCasteljau(ps, t);
    
    const line = [p, translate(scale(0.1)(n.map(eEstimate)), p)];
    
    drawBezier_(ps.map(tc));
    drawBezier2(line.map(tc));
    
    dot_1(tc(evaluate(ps, t)));

    return [{ result: n, params: [params] }];
}



function Evaluate2ndDerivativeExact() {
    return (<>
        <BezierCanvas
            functionName='evaluate2ndDerivativeExact'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    </>)
}



export { Evaluate2ndDerivativeExact }
