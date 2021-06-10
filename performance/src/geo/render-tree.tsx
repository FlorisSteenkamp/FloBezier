import * as React from 'react';
import { render } from 'react-dom';
import { IterationExtras } from '../../../src/intersection/bezier3-intersection/debug';
import { Iteration } from '../../../src/intersection/bezier3-intersection/iteration';
import { mapWithParent } from '../../react-svg-tree/src/helpers/tree-graph';
import { $Tree } from '../../react-svg-tree/src/tree';
import { $Node } from './$node';


type TreeNode = Iteration & IterationExtras;


function renderTree(tree: TreeNode) {
    function getChildren(node: TreeNode): TreeNode[] {
        return node.children || [];
    }

    function getNodeKey(node: TreeNode) {
         return node.uid.toString();
    }

    const nodesWithParent = mapWithParent(getChildren, tree);
    for (const nodeWithParent of nodesWithParent) {
        nodeWithParent.node.uid = Math.random();
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