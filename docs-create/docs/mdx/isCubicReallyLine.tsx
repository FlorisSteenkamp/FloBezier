import * as React from 'react';
import { evaluate, isCubicReallyLine } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = isCubicReallyLine;


// params
const ps1 = [[1,1], [2,2], [3,3], [4,4]];
const ps2 = [[1,1], [2,2], [3,3], [5,5]];


function draw1(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps1] as [number[][]];

    const r = f(...params);
    
    drawBezier_(ps1.map(tc));

    return [{ result: r, params: [params] }];
}


function draw2(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [ps2] as [number[][]];

    const r = f(...params);
    
    drawBezier_(ps2.map(tc));

    return [{ result: r, params: [params] }];
}



function IsCubicReallyLine() {
    return (<>
        <BezierCanvas
            functionName='isCubicReallyLine'
            draw={draw1}
            draggables={ps1}
        />
        <BezierCanvas
            functionName='isCubicReallyLine'
            draw={draw2}
            draggables={ps2}
        />
    </>)
}



export { IsCubicReallyLine }
