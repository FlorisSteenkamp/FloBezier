import * as React from 'react';
import { translate } from 'flo-vector2d';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { isSelfOverlapping } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { scale } from '../components/fs/scale';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = isSelfOverlapping;


// params
const ps1 = [[0,0], [3,3], [1,1], [2,2]].map(scale(3)).map(translate([1,1]));
const ps2 = [[0,0], [3,3], [1,1], [2*(1+Number.EPSILON),2]].map(scale(3.1)).map(translate([1,1]));


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


function IsSelfOverlapping() {
    return (<>
        <BezierCanvas
            functionName='isSelfOverlapping'
            draw={draw1}
            draggables={ps1}
        />
        
        <BezierCanvas
            functionName='isSelfOverlapping'
            draw={draw2}
            draggables={ps2}
        />
    </>)
}


export { IsSelfOverlapping }
