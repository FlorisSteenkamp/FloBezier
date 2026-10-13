import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { getHodograph } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getHodograph;


// params
const ps = [[12.09,2.718], [16.375,4.625], [15.375,2.843], [15.688,5]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier1 = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#ff0', 'transparent');

    const params = [ps] as [number[][]];

    const h = f(...params);
    
    drawBezier1(ps.map(tc));
    drawBezier2(h.map(tc));

    return [{ result: h, params: [params] }];
}



function GetHodograph() {
    return (<>
        <BezierCanvas
            functionName='getHodograph'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { GetHodograph }
