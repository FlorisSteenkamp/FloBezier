import * as React from 'react';
import { evaluate, cubicToHybridQuadratic, evalDeCasteljau } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = cubicToHybridQuadratic;


// params
const ps = [[1,1], [5.125,8], [12,8], [16,3]];
const scalars = [
    { 
        title: 't', val: 0.75,
        min: 0, max: 1, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#ff0', 'transparent');

    const t = scalars[0].val;
    const params = [ps] as [number[][]];

    const ps_ = f(...params);

    drawBezier_(ps.map(tc));

    drawBezier2([ps_[0],evalDeCasteljau(ps_[1],t),ps_[2]].map(tc));

    return [{ result: ps_, params: [params] }];
}


function CubicToHybridQuadratic() {
    return (<>
        <BezierCanvas
            functionName='cubicToHybridQuadratic'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    </>)
}



export { CubicToHybridQuadratic }
