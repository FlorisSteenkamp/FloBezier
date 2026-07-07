import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { IterationExtras } from '../../../src/intersection/bezier-bezier-intersection-fast/debug.js';
import { Iteration } from '../../../src/intersection/bezier-bezier-intersection-fast/iteration.js';
import { mapWithParent } from '../../react-svg-tree/src/helpers/tree-graph.js';
import { $Tree } from '../../react-svg-tree/src/tree.js';


type IterationWithExtras = Iteration & IterationExtras;


function $Node({ node, x, y, r }: { node: IterationWithExtras; x: number; y: number; r: number }) {
    return (
        <g>
            <circle cx={x} cy={y} r={r} fill="#0b5" />
            <text
                x={x}
                y={y + 1.5}
                style={{ fontSize: 5 }}
                textAnchor="middle"
                fill="#fff"
            >
                {node.uid}
            </text>
        </g>
    );
}


function renderTree(tree: IterationWithExtras) {
    function getChildren(node: IterationWithExtras): IterationWithExtras[] {
        return node.children || [];
    }

    function getNodeKey(node: IterationWithExtras) {
         return node.uid !== undefined ? node.uid.toString() : '';
    }

    const nodesWithParent = mapWithParent(getChildren, tree);
    let ii = 0;
    for (const nodeWithParent of nodesWithParent) {
        if (nodeWithParent.node.uid === undefined) {
            nodeWithParent.node.uid = --ii;
        }
    }

    createRoot(document.getElementById('root-div') as HTMLDivElement).render(
        <$Tree 
            getNodeSize={node => { return 8; }}
            getChildren={getChildren}
            getNodeKey={getNodeKey}
            nodeElement={$Node}
            width={200} 
            height={275}
            root={tree}
            levelSeparation={20}
            siblingSeparation={5}
            subtreeSeparation={5}
            className="tree-svg"
        />
    );
}
  

export { renderTree }