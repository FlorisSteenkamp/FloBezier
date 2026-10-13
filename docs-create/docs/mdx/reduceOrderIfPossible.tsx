import * as React from 'react';
import { translate } from 'flo-vector2d';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { reduceOrderIfPossible } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { scale } from '../components/fs/scale';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = reduceOrderIfPossible;


// params
const ps1 = [[0,0], [1,1], [2,1], [3,0]].map(scale(5)).map(translate([2,2]));
const ps2 = [[0,0], [1,1], [2,2], [3,3]].map(scale(2)).map(translate([2,2]));


function draw1(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#ff0', 'transparent');

    const params = [ps1] as [number[][]];

    const ps_ = f(...params);
    
    drawBezier_(ps1.map(tc));
    drawBezier2(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}


function draw2(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#ff0', 'transparent');

    const params = [ps2] as [number[][]];

    const ps_ = f(...params);
    
    drawBezier_(ps2.map(tc));
    drawBezier2(ps_.map(tc));

    return [{ result: ps_, params: [params] }];
}



function ReduceOrderIfPossible() {
    return (<>
        <BezierCanvas
            functionName='reduceOrderIfPossible'
            draw={draw1}
            draggables={ps1}
        />

        <BezierCanvas
            functionName='reduceOrderIfPossible'
            draw={draw2}
            draggables={ps2}
        />
    </>)
}



export { ReduceOrderIfPossible }
