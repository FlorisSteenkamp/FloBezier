import * as React from 'react';
import { evaluate, getControlPointBox } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { drawRect } from '../components/draw/draw-rect';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getControlPointBox;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawRect_ = drawRect(ctx, '#ff0', 'transparent');

    const params = [ps] as [number[][]];

    const box = f(...params);
    
    drawBezier_(ps.map(tc));
    drawRect_(box.map(tc));

    return [{ result: box, params: [params] }];
}



function GetControlPointBox() {
    return (<>
        <BezierCanvas
            functionName='getControlPointBox'
            draw={draw}
            draggables={ps}
        />
    </>)
}



export { GetControlPointBox }
