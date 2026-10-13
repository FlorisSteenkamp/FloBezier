import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { evalDeCasteljau, evalDeCasteljauWithErr } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = evalDeCasteljauWithErr;

// params
const ps = [[1,1], [7,7], [4,2], [8,1.5]];
const scalars = [
    { 
        title: 't', val: 0.4,
        min: 0, max: 1, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const t = scalars[0].val;
    const params = [ps, t] as [number[][],number];

    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');
    const dot_ = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);

    const r = f(...params);

    const p = evalDeCasteljau(ps, t)
    drawBezier_(ps.map(tc));
    dot_(tc(p));

    return [{ result: r, params: [params] }];
}


function EvalDeCasteljauWithErr() {
    return (
        <BezierCanvas
            functionName='evalDeCasteljauWithErr'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    )
}


export { EvalDeCasteljauWithErr }
