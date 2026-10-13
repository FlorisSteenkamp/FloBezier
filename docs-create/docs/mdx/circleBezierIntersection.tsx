import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { evaluate, circleBezierIntersection } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = circleBezierIntersection;
const scale = (width/2)/10;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];
const center = [7.4,6.78128];
const scalars = [
    { 
        title: 'radius', val: 3,
        min: 0, max: 8, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawCircle_ = drawCircle(ctx, '#f00', 'transparent');
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const dot_1 = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);

    const radius = scalars[0].val;
    const circle = { center, radius };
    const params = [circle, ps] as [{ center: number[], radius: number }, number[][]];
    const xs = f(...params);

    drawBezier_(ps.map(tc), true, true);
    drawCircle_(tc(circle.center), radius*scale);

    xs.map(x => dot_1(tc(evaluate(ps, x.t))));

    return [{ result: xs, params: [params] }]
}



function CircleBezierIntersection() {
    return (<>
        <BezierCanvas
            functionName='circleBezierIntersection'
            draw={draw}
            draggables={[center, ps[0],ps[1],ps[2],ps[3]]}
            scalars={scalars}
        />
    </>)
}



export { CircleBezierIntersection }
