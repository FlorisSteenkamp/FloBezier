import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { getImplicitForm2Dd } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getImplicitForm2Dd;


// params
const ps = [[10,7], [8,4], [3,2]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');

    const params = [ps] as [number[][]];
    
    const r = f(...params);

    drawBezier_(ps.map(tc));

    return [{ result: r, params: [params] }];
}


function GetImplicitForm2Dd() {
    return (<>
        <BezierCanvas
            functionName='getImplicitForm2Dd'
            draw={draw}
            draggables={ps}
        />
    </>)
}


export { GetImplicitForm2Dd }
