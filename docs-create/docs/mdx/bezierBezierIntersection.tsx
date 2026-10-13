import * as React from 'react';
import { translate } from 'flo-vector2d';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { bezierBezierIntersection, fromTo } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { scale } from '../components/fs/scale';
import { Convertible } from '../components/fs/convertible';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = bezierBezierIntersection;


// exact overlap
const psA1 = [[1,1],[6,2.5],[2,1],[3,3]].map(translate([4,2]));
const psA2 = fromTo(psA1,-0.125,1.125);

// point cubic - point is exactly on curve
const psB1 = [[1.5,0.75]].map(scale(4)).map(translate([2,2]));
const psB2 = [[0,0],[1,1],[2,1],[3,0]].map(scale(4)).map(translate([2,2]));  //=> disguised qudratic

// two quadratics
const psC1 = [[1.5,0.75],[1,1],[0.5,0.375]].map(scale(4)).map(translate([2,2]));;
const psC2 = [[0,0],[1,1],[2,1]].map(scale(4)).map(translate([2,2]));;


const psPairs: { pss: number[][][]; description: string; }[] = [
    {
        pss: [
            [[6.4,4.8], [15,5], [1,4], [10,4]],
            [[9.4,0.4], [9.3,10.3], [8.1,0.1], [7.53125,5.5]]
        ],
        description: 
            `This example illustrates Bezout's Theorem: a cubic-cubic `+
            `intersection implies 3x3 = 9 intersections at most.`
    },
    { 
        pss: [psA1, psA2],
        description: 
            `Overlapping algebraically identical bezier curves have an infinite `+
            `number of intersecions; this is indicated by the kind of intersection (kind === 5) `+
            `and only the intersections at the endpoints of each curve are retrurned `
    },
    {
        pss: [psB1,psB2],
        description: `point / cubic bezier curve - point is exactly on curve`
    },
    {
        pss: [psC1,psC2],
        description: `quadratic / quadratic bezier curves`
    }
];

//The example below is just some arbitrary cubic bezier curves.


function draw(i: number) { return (ctx: CanvasRenderingContext2D): ParamsAndResult[] => {
    const dot_1 = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);
    const drawBezier1 = drawBezier(ctx, '#f00', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#0f0', 'transparent');

    const params = psPairs[i].pss as [number[][],number[][]];
    const xs = f(...params);

    drawBezier2(params[1].map(tc));
    drawBezier1(params[0].map(tc));
    
    xs.map(x => dot_1(tc(x.p)));

    return [{ result: xs, params: [params] }];
}}



function BezierBezierIntersection() {
    return (<>
        <p>
            Some examples are shown below:
        </p>
        {psPairs.map((psPair,i) => {
            const pss = psPair.pss;
            return <React.Fragment key={i}>
                <p>
                    {psPair.description}
                </p>
                <BezierCanvas
                    functionName='bezierBezierIntersection'
                    draw={draw(i)}
                    draggables={[...pss[0],...pss[1]]}
                />
                <hr/>
            </React.Fragment>
        })}
    </>)
}



export { BezierBezierIntersection }
