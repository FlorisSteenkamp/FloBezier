import * as React from 'react';
import { render } from 'react-dom';
import { IterationExtras } from '../../../src/intersection/bezier-bezier-intersection-fast/debug.js';
import { Iteration } from '../../../src/intersection/bezier-bezier-intersection-fast/iteration.js';
import { mapWithParent } from '../../react-svg-tree/src/helpers/tree-graph.js';
import { $Tree } from '../../react-svg-tree/src/tree.js';
import { $Node } from './$node.js';


type IterationWithExtras = Iteration & IterationExtras;


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

    render(
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
        />,

        document.getElementById('root-div') as HTMLDivElement
    );
}
  

export { renderTree }