import * as React from 'react';
import { generateQuarterCircle } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { ParamsAndResult } from '../components/fs/params-and-result';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';


const tc = transformCoordinatesBL(width, height);
const f = generateQuarterCircle;


// params
const p = [4.5,4.5];
const scalars = [
    { 
        title: 'scale', val: 2.75,
        min: -5, max: 5, step: 0.01
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const params = [scalars[0].val,p] as [number, number[]];

    const bz = f(...params);
    
    drawBezier_(bz.map(tc));

    return [{ result: bz, params: [params] }];
}



function GenerateQuarterCircle() {
    return (<>
        <BezierCanvas
            functionName='generateQuarterCircle'
            draw={draw}
            draggables={[p]}
            scalars={scalars}
        />
    </>)
}



export { GenerateQuarterCircle }
