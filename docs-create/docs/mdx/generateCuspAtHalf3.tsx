import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { generateCuspAtHalf3 } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = generateCuspAtHalf3;


// params
const p0 = [1,1];
const pz = [10.53125,4.8125];

const pE = [18,0.5];

// check out (as parameters): [[1,1], [3.5625, 5], [18,0.5]];
function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');

    const params = [p0, pz, pE] as [number[], number[], number[]];

    const ps = f(...params);

    drawBezier_(ps.map(tc), true);

    return [{ result: ps, params: [params] }];
}


function GenerateCuspAtHalf3() {
    return (
        <BezierCanvas 
            functionName='generateCuspAtHalf3'
            draw={draw}
            draggables={[p0,pz,pE]}
        />
    )
}


export { GenerateCuspAtHalf3 }
