import * as React from 'react';
import { toPowerBasisErrorCounters } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = toPowerBasisErrorCounters;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps] as [number[][]];

    const ts = f(...params);
    
    drawBezier_(ps.map(tc));

    return [{ result: ts, params: [params] }];
}



function ToPowerBasisErrorCounters() {
    return (<>
        <BezierCanvas
            functionName='toPowerBasisErrorCounters'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { ToPowerBasisErrorCounters }
