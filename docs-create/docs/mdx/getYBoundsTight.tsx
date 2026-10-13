import * as React from 'react';
import { getYBoundsTight } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { drawLine } from '../components/draw/draw-line';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getYBoundsTight;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawLine_ = drawLine(ctx, '#ff0');

    const params = [ps] as [number[][]];

    const bounds = f(...params);
    
    drawBezier_(ps.map(tc));
    const minY = bounds.minY.box[0][1];
    const maxY = bounds.maxY.box[1][1];
    drawLine_(tc([0,minY]),tc([width,minY]));
    drawLine_(tc([0,maxY]),tc([width,maxY]));

    return [{ result: bounds, params: [params] }];
}



function GetYBoundsTight() {
    return (<>
        <BezierCanvas
            functionName='getYBoundsTight'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { GetYBoundsTight }
