import * as React from 'react';
import { intersectBoxes } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawRect } from '../components/draw/draw-rect';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = intersectBoxes;


// params
const b1 = [[1.9,2.5], [9.7,10.2]];
const b2 = [[8.25,1.56], [16.8,7.1]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawRect_ = drawRect(ctx, '#f00', undefined);

    const params = [b1, b2] as [number[][], number[][]];
    
    const box = f(...params);

    drawRect_(b1.map(tc));
    drawRect_(b2.map(tc));

    if (box !== undefined) {
        drawRect(ctx, '#00f', '#00f')(box.map(tc));
    }

    return [{ result: box, params: [params] }];
}


function IntersectBoxes() {
    return (
        <BezierCanvas
            functionName='intersectBoxes'
            draw={draw}
            draggables={[b1[0], b1[1], b2[0], b2[1]]}
        />
    )
}


export { IntersectBoxes }
