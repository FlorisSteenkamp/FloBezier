import * as React from 'react';
import { evaluate, getXBoundsTight } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { drawLine } from '../components/draw/draw-line';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getXBoundsTight;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawLine_ = drawLine(ctx, '#ff0');

    const params = [ps] as [number[][]];

    const r = f(...params);
    
    drawBezier_(ps.map(tc));
    const minX = r.minX.box[0][0];
    const maxX = r.maxX.box[1][0];
    drawLine_(tc([minX,0]),tc([minX,height]));
    drawLine_(tc([maxX,0]),tc([maxX,height]));

    return [{ result: r, params: [params] }];
}



function GetXBoundsTight() {
    return (<>
        <BezierCanvas
            functionName='getXBoundsTight'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { GetXBoundsTight }
