import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { quadraticToPolyline } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = quadraticToPolyline;


// params
const ps = [[1,1], [15,10.3125], [15.375,0.875]];
const scalars = [
    { 
        title: 'tolerance', val: 0.023,
        min: 0.001, max: 1, step: 0.001
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const tolerance = scalars[0].val;
    const params = [ps,tolerance] as [number[][],number];

    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#ff0', 'transparent');

    const ps_ = f(...params);
    
    drawBezier_(ps.map(tc));

    let prevP = ps_[0];
    for (let i=1; i<ps_.length; i++) {
        const p = ps_[i];
        const l = [prevP,p];
        drawBezier2(l.map(tc));
        prevP = p;
    }

    return [{ result: ps_, params: [params] }];
}


function QuadraticToPolyline() {
    return (<>
        <BezierCanvas
            functionName='quadraticToPolyline'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    </>)
}



export { QuadraticToPolyline }
