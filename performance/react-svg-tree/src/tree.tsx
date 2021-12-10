import * as React from 'react';
import { TreeGraph, Position, getCoordinates, createTreeGraph, mapWithParent } from './helpers/tree-graph.js';
import { positionTree } from './helpers/position-tree.js';
import { TreeProps, OptionalTreeProps, TreePropsAllRequired } from './helpers/tree-props.js';


const defaults: OptionalTreeProps = {
    levelSeparation: 20,
    siblingSeparation: 15,
    subtreeSeparation: 15,
    className: ''
};


/**
 * Tree component
 */
function $Tree<T>(props: TreeProps<T>) {
    const props_: TreePropsAllRequired<T> = { ...defaults, ...props };

    let { 
        nodeElement, root, className, getNodeSize, getChildren, getNodeKey
    } = props_;


    /**
     * Render the nodes into a normalized tree. 
     * 
     * Here we create a `TreeGraph` object that maps to the `Nodes` and call 
     * `positionTree`, the algorithm that determines the optimal x-coordinates 
     * for each node in the tree.
     * 
     * * If we cannot fit the nodes in the viewBox `null` will be returned.
     */
    //function renderTree(): React.ReactNode[] {
    function renderTree(): { width: number, height: number, svgElements: React.ReactNode[] } {
        const treeGraph = createTreeGraph_();

        const svgElements: Array<React.ReactNode> = [];

        let minX = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        const nodesWithParent = mapWithParent(getChildren, root);
        
        for (const nodeWithParent of nodesWithParent) {
            const {node} = nodeWithParent;
            const [x, y] = getCoordinates(treeGraph, node);

            if (x < minX) { minX = x; }
            if (x > maxX) { maxX = x; }
            if (y < minY) { minY = y; }
            if (y > maxY) { maxY = y; }
        }

        const width = maxX - minX;
        const height = maxY - minY;

        //const xShift = width/2;

        for (const nodeWithParent of nodesWithParent) {
            const {node} = nodeWithParent;
            const [x, y] = getCoordinates(treeGraph, node);

            const createdNode = nodeElement({
                x: x - minX, y,
                node: node,
                r: getNodeSize(node),
                graph: treeGraph,
            });

            const childNodes = getChildren(node);
            svgElements.push(
                createChildConnections(minX, treeGraph, node, childNodes),
            );
            svgElements.push(createdNode);
        }

        return { width, height, svgElements };
    };


    /**
     * Create a connection between a parent node and each of each children
     */
    function createChildConnections(
            minX: number,
            treeGraph: TreeGraph<T>,
            node: T,
            childNodes: Array<T>): Array<React.ReactNode> {

        const connectionNodes: Array<React.ReactNode> = [];
        if (node === undefined) return [];

        const { getNodeKey } = treeGraph;

        for (const childNode of childNodes) {
            const [x, y] = getCoordinates(treeGraph, node);
            const [childX, childY] = getCoordinates(treeGraph, childNode);

            connectionNodes.push(
                <line
                    x1={x-minX}
                    y1={y}
                    x2={childX-minX}
                    y2={childY}
                    stroke="#000"
                    strokeWidth={1}
                    key={`${getNodeKey(node)}-${getNodeKey(childNode)}`}
                />
            );
        }
        
        return connectionNodes;
    }


    /**
     * Creates and returns a `TreeGraph` object and call the `positionTree` 
     * algorithm that determines the final `x` and `y` positions of the nodes. 
     * 
     * * Returns `null` if the nodes cannot fit into the viewing box
     */
    function createTreeGraph_() {
        const rootPosition: [T, Position] = [
            root,
            //{ x: width / 2, y: 5, prelim: 0, mod: 0 },
            { x: 0, y: 5, prelim: 0, mod: 0 },
        ];

        const treeGraph = createTreeGraph(
            root,
            getNodeSize,
            getChildren,
            getNodeKey,
            rootPosition,
        );

        //positionTree(treeGraph, rootPosition[0], props_);
        positionTree(treeGraph, rootPosition[0], props_);

        return treeGraph;
    };


    const { width, height, svgElements: $tree } = renderTree();
    const marginSides = 50;
    const marginBottom = 20;

    return (
        <svg 
            //style={{ width: '100%' }}
            viewBox={`${-marginSides} 0 ${width + 2*marginSides} ${height + marginBottom}`} 
            //viewBox={`0 0 ${200} ${250}`} 
            className={className}
        >
            {$tree}
        </svg>
    );
}


export { $Tree }
