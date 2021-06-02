import * as React from 'react';
import { render } from 'react-dom';
import { IterationExtras } from '../../../src/intersection/bezier3-intersection/debug';
import { Iteration } from '../../../src/intersection/bezier3-intersection/iteration';
import { NodeProps } from '../../react-svg-tree/src/helpers/node-props';
import { mapWithParent } from '../../react-svg-tree/src/helpers/tree-graph';
import { $Tree } from '../../react-svg-tree/src/tree';
import { drawIterToCanvas } from './draw-iter-to-canvas';


type TreeNode = Iteration & IterationExtras;


let prevOver: TreeNode = undefined;
let prevClick: TreeNode = undefined;

function onMouseOver(node: TreeNode) {
    if (prevOver === node) { return; }
    prevOver = node;

    //console.log(node.uid);
}


function onClick(node: TreeNode) {
    if (prevClick === node) { return; }
    prevClick = node;

    drawIterToCanvas(canvas, node);
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