import * as React from 'react';
import { render } from 'react-dom';
import { IterationExtras } from '../../../src/intersection/bezier3-intersection/debug';
import { Iteration } from '../../../src/intersection/bezier3-intersection/iteration';
import { NodeProps } from '../../react-svg-tree/src/helpers/node-props';
import { mapWithParent } from '../../react-svg-tree/src/helpers/tree-graph';
import { $Tree } from '../../react-svg-tree/src/tree';
import { settings } from '../settings';
import { drawIterClipsToCanvas, drawIterHybridPolyToCanvas } from './draw-iter-to-canvas';
import { draw, ctx } from '../draw-stuff';
import { unsquashp, untransp } from '../affine';
import { bezier3Intersection, evaluate } from '../../../src/index';


const { tc, num, timingOnly, showGeoXs, showGeoIters } = settings;

type TreeNode = Iteration & IterationExtras;


let prevOver: TreeNode = undefined;
let prevClick: TreeNode = undefined;
let prevRClick: TreeNode = undefined;

function onMouseOver(node: TreeNode) {
    if (prevOver === node) { return; }
    prevOver = node;

    //console.log(node.uid);
}


function onClick(node: TreeNode) {
    //if (prevClick === node) { return; }
    prevClick = node;

    drawIterHybridPolyToCanvas(canvas, node);
 }

function onRightClick(node: TreeNode) {
    //if (prevRClick === node) { return; }
    prevRClick = node;

    drawIterClipsToCanvas(canvas, node);
    if (!node.parent) {
        const tss = bezier3Intersection(node.F, node.G);
        drawIntersectionsGeo(tss, node.F)
    }
}

function drawIntersectionsGeo(tss: number[][][], ps: number[][]) {
    //if (!ris) { return; }
    //ris.map(t => dot_1(tc(evaluate(ps2, mid(t)))));
    const { dot_ } = draw(ctx);

    tss.map(ts => {
        const _p = evaluate(ps, ts[0][0]);
        const p = tc(unsquashp(untransp(_p)));

        dot_(p);
    });
}


const canvas = document.getElementById('canvas1') as HTMLCanvasElement;

function $Node(props: NodeProps<TreeNode>) {
    const { x, y, node } = props;
    const key = node.uid.toString();

    const fill = isLeadToX(node) ? 'blue' : 'black';
    return (
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
    );
}


function isLeadToX(node: TreeNode) {
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