import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { isQuadObtuse } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = isQuadObtuse;

// params
const ps1 = [[3.4,6.8], [6.3,2.3], [12.8,1.78]];
const ps2 = [[18.53,9.15], [2,2], [14.156,9.593]];


function draw1(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const bezier2_ = drawBezier(ctx, '#f00', 'transparent');
    const params = [ps1] as [number[][]];
    const r = f(...params);
    bezier2_(ps1.map(tc));

    return [{ result: r, params: [params] }];
}


function draw2(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const bezier2_ = drawBezier(ctx, '#f00', 'transparent');
    const params = [ps2] as [number[][]];
    const r = f(...params);
    bezier2_(ps2.map(tc));

    return [{ result: r, params: [params] }];
}


function IsQuadObtuse() {
    return (<>
        <BezierCanvas
            functionName='isQuadObtuse'
            draw={draw1}
            draggables={ps1}
        />
        
        <BezierCanvas
            functionName='isQuadObtuse'
            draw={draw2}
            draggables={ps2}
        />
    </>)
}


export { IsQuadObtuse }
