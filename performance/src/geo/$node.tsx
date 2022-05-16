import * as React from 'react';
import { IterationExtras } from '../../../src/intersection/bezier-bezier-intersection-fast/debug.js';
import { Iteration } from '../../../src/intersection/bezier-bezier-intersection-fast/iteration.js';
import { NodeProps } from '../../react-svg-tree/src/helpers/node-props.js';
import { mapWithParent } from '../../react-svg-tree/src/helpers/tree-graph.js';
import { settings } from '../settings.js';
import { drawIterClipsToCanvas, drawIterHybridPolyToCanvas } from './draw-iter-to-canvas.js';
import { draw, ctx } from '../draw-stuff.js';
import { unsquashp, untransp } from '../affine.js';
import { bezierBezierIntersectionFast, evaluate } from '../../../src/index.js';


const { tc } = settings;

type IterationWithExtras = Iteration & IterationExtras;


let prevOver: IterationWithExtras | undefined = undefined;

function onMouseOver(node: IterationWithExtras) {
    if (prevOver === node) { return; }
    prevOver = node;

    //console.log(node.uid);
}


function onClick(node: IterationWithExtras) {
    drawIterHybridPolyToCanvas(canvas, node);
}

function onRightClick(node: IterationWithExtras) {
    drawIterClipsToCanvas(canvas, node);
    if (!node.parent) {
        const tss = bezierBezierIntersectionFast(node.F, node.G);
        drawIntersectionsGeo(tss, node.F)
    }
}

function drawIntersectionsGeo(tss: number[][], ps: number[][]) {
    //if (!ris) { return; }
    //ris.map(t => dot_1(tc(evaluate(ps2, mid(t)))));
    const { dot_ } = draw(ctx);

    tss.map(ts => {
        const _p = evaluate(ps, ts[0]);
        const p = tc(unsquashp(untransp(_p)));

        dot_(p);
    });
}


const canvas = document.getElementById('canvas1') as HTMLCanvasElement;

function $Node(props: NodeProps<IterationWithExtras>) {
    const { x, y, node } = props;
    const key = node.uid !== undefined ? node.uid.toString() : '';
    const str = node.uid !== undefined && node.uid >= 0 ? node.uid.toString() : '';

    const fill = isLeadToX(node) ? 'blue' : 'black';
    return (<g key={key}>
        <circle 
            style={{ fill }}
            key={key}
            cx={x} 
            cy={y} 
            r={5}
            onMouseOver={(e: any) => onMouseOver(node)}
            onContextMenu={(e: any) => {
                e.preventDefault();
                onRightClick(node)
            }}
            onClick={(e: any) => onClick(node)}
        />
        <text 
            x={x-5} y={y-5}
            style={{font: 'bold 8px sans-serif', fill: 'red'}}
        >
                {str}
        </text>
    </g>);
}


function isLeadToX(node: IterationWithExtras) {
    const nodesWithParent = mapWithParent(node => node.children || [], node);

    for (const nodeWithParent of nodesWithParent) {
        const { node, parent } = nodeWithParent;

        if (node.foundX) {
            return true;
        }
    }

    return false;
}


export { $Node }