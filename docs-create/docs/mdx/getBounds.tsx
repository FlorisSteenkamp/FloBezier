import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { getBounds } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawRect } from '../components/draw/draw-rect';
import { drawBezier } from '../components/draw/draw-bezier';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getBounds;


// params
const ps = [[1,1], [5.78125,7.21875], [11.8125,1.3125], [6.21875,6.21875]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawRect_ = drawRect(ctx, '#ff0', 'transparent');
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');

    const params = [ps] as [number[][]];
    
    const boxWithTs = f(...params);

    drawRect_(boxWithTs.box.map(tc));
    drawBezier_(ps.map(tc));

    return [{ result: boxWithTs, params: [params] }];
}


function GetBounds() {
    return (
        <BezierCanvas
            functionName='getBounds'
            draw={draw}
            draggables={ps}
        />
    )
}


export { GetBounds }
