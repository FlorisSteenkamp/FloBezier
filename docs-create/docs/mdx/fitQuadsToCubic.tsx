import * as React from 'react';
import { fitQuadsToCubic } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = fitQuadsToCubic;


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];
const scalars = [
    { 
        title: 'tolerance', val: 0.1,
        min: 0.0001, max: 1, step: 0.0001
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const params = [ps,scalars[0].val] as [number[][],number];

    const drawBezier_1 = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier_2 = drawBezier(ctx, '#f00', 'transparent');

    const pss = f(...params);
    
    for (let i=0; i<pss.length; i++) {
        const ps = pss[i];
        if (i%2 === 0) {
            drawBezier_1(ps.map(tc));
        } else {
            drawBezier_2(ps.map(tc));
        }
    }

    return [{ result: pss, params: [params] }];
}



function FitQuadsToCubic() {
    return (<>
        <BezierCanvas
            functionName='fitQuadsToCubic'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    </>)
}



export { FitQuadsToCubic }
