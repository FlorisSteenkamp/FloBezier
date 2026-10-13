import * as React from 'react';
import { toPowerBasis_1stDerivativeErrorCounters } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = toPowerBasis_1stDerivativeErrorCounters;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps] as [number[][]];

    const r = f(...params);
    
    drawBezier_(ps.map(tc));

    return [{ result: r, params: [params] }];
}



function ToPowerBasis_1stDerivativeErrorCounters() {
    return (<>
        <BezierCanvas
            functionName='toPowerBasis_1stDerivativeErrorCounters'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { ToPowerBasis_1stDerivativeErrorCounters }
