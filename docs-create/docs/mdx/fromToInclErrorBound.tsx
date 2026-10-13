import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { fromToInclErrorBound } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = fromToInclErrorBound;


// params
const ps = [[1,1], [7.125,10], [17.375,2.875], [5.375,3.125]];
const scalars = [
    { 
        title: 'tS', val: 0.25,
        min: -1, max: 2, step: 0.01
    },
    { 
        title: 'tE', val: 0.75,
        min: -1, max: 2, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const tS = scalars[0].val;
    const tE = scalars[1].val;

    const params = [ps, tS, tE] as [number[][], number, number];

    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#f00', 'transparent');

    const ps_ = f(...params);
    
    drawBezier_(ps.map(tc));
    drawBezier2(ps_.ps.map(tc));

    return [{ result: ps_, params: [params] }];
}



function FromToInclErrorBound() {
    return (<>
        <BezierCanvas
            functionName='fromToInclErrorBound'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    </>)
}



export { FromToInclErrorBound }
