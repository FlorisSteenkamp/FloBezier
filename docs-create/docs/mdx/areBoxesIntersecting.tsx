import * as React from 'react';
import { areBoxesIntersecting } from '../../../node/boxes/are-boxes-intersecting';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawRect } from '../components/draw/draw-rect';
import { Convertible } from '../components/fs/convertible';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = areBoxesIntersecting;

// params
const b1 = [[1.9,2.5], [9.7,10.2]];
const b2 = [[8.25,1.56], [16.8,7.1]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawRect_ = drawRect(ctx, '#f00', undefined);

    const params = [true, b1, b2] as [boolean, number[][], number[][]];

    const r = f(...params);

    drawRect_(b1.map(tc));
    drawRect_(b2.map(tc));

    return [{ result: r, params: [params] }];
}


function AreBoxesIntersecting() {
    return (
        <BezierCanvas
            functionName='areBoxesIntersecting'
            draw={draw}
            draggables={[b1[0], b1[1], b2[0], b2[1]]}
        />
    )
}


export { AreBoxesIntersecting }
