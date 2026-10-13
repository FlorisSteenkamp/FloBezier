import * as React from 'react';
import { translate } from 'flo-vector2d';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { scale } from '../components/fs/scale';
import { isQuadReallyLine } from '../../../node/index';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = isQuadReallyLine;


// params
const ps1 = [[0,0], [1,1], [2,2]].map(scale(5)).map(translate([1,1]));
const ps2 = [[0,0], [1,1], [3,3]].map(scale(2)).map(translate([1,1]));


function draw1(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');
    const params = [ps1] as [number[][]];
    const r = f(...params);
    drawBezier_(ps1.map(tc));

    return [{ result: r, params: [params] }];
}


function draw2(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');
    const params = [ps2] as [number[][]];
    const r = f(...params);
    drawBezier_(ps2.map(tc));

    return [{ result: r, params: [params] }];
}


function IsQuadReallyLine() {
    return (<>
        <BezierCanvas
            functionName='isQuadReallyLine'
            draw={draw1}
            draggables={ps1}
        />
        
        <BezierCanvas
            functionName='isQuadReallyLine'
            draw={draw2}
            draggables={ps2}
        />
    </>)
}


export { IsQuadReallyLine }
