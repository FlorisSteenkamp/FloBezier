import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { getIntervalBoxDd } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawRect } from '../components/draw/draw-rect';
import { drawBezier } from '../components/draw/draw-bezier';
import { drawPartialBezier } from '../components/draw/draw-partial-bezier';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getIntervalBoxDd;


// params
const ps = [[13.375,2.343], [3.15,4.41], [10.34,8.8], [15.818,2.406]];
const scalars = [
    { 
        title: 't start', val: 0.15,
        min: 0, max: 1, step: 0.01
    },
    { 
        title: 't end', val: 0.65,
        min: 0, max: 1, step: 0.01
    },
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawRect_ = drawRect(ctx, '#ff0', undefined);
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');
    const drawPartialBezier_ = drawPartialBezier(ctx, '#0f0', 'transparent');

    const params = [ps, [[0,scalars[0].val], [0,scalars[1].val]]] as [number[][], number[][]];

    const box = f(...params);
    // convert to double precision
    const box_ = box.map(p => p.map(c => c[0] + c[1]));

    drawRect_(box_.map(tc));
    drawBezier_(ps.map(tc));
    drawPartialBezier_(ps.map(tc), [scalars[0].val, scalars[1].val], true, true);

    return [{ result: box, params: [params] }];
}


function GetIntervalBoxDd() {
    return (
        <BezierCanvas
            functionName='getIntervalBoxDd'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    )
}


export { GetIntervalBoxDd }
