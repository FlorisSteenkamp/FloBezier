import * as React from 'react';
import { cubicToQuadratic } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { ParamsAndResult } from '../components/fs/params-and-result';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';


const tc = transformCoordinatesBL(width, height);
const f = cubicToQuadratic;


// params
const ps = [[1,1], [5.5,4.4], [11.8,5.4], [9,1]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, 'turquoise', 'transparent');
    const drawBezier3 = drawBezier(ctx, '#f0f', 'transparent');

    const params1 = [ps,true] as [number[][], boolean];
    const params2 = [ps,false] as [number[][], boolean];

    const ps1 = f(...params1);
    const ps2 = f(...params2);
    
    drawBezier_(ps.map(tc));
    drawBezier2(ps1!.map(tc));
    drawBezier3(ps2!.map(tc));

    return [
        { result: ps1, params: [params1] },
        { result: ps2, params: [params2] },
    ];
}




function CubicToQuadratic() {
    return (<>
        <BezierCanvas
            functionName='cubicToQuadratic'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { CubicToQuadratic }
