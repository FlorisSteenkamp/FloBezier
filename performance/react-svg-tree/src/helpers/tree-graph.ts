interface Position {
    x: number;
    y: number;
    prelim: number;
    mod: number;
}


interface TreeGraph<T> {
    //vertexMap: Map<T, T[]>;
    root: T;
    parentMap: Map<T, T>;
    positionMap: Map<T, Position>;
    leftNeighborMap: Map<T, T>;
    prevNodeMap: Map<number, T>;
    getNodeSize: (node: T) => number;
    getChildren: (node: T) => T[];
    getNodeKey: (node: T) => string;
    xTopAdjustment: number;
    yTopAdjustment: number;
}

function createTreeGraph<T>(
        root: T,
        getNodeSize: (node: T) => number,
        getChildren: (node: T) => T[],
        getNodeKey: (node: T) => string,
        rootNodePosition: [T, Position]): TreeGraph<T> {

    const treeGraph: TreeGraph<T> = {
        root,
        parentMap: undefined,
        positionMap: new Map([rootNodePosition]),
        leftNeighborMap: new Map(),
        prevNodeMap: new Map(),
        getNodeSize,
        getChildren,
        getNodeKey,
        xTopAdjustment: undefined,
        yTopAdjustment: undefined
    }

    treeGraph.parentMap = createParentMap(treeGraph);

    return treeGraph;
}


function mapWithParent<T>(
        getChildren: (node: T) => T[],
        root: T): { node: T; parent: T }[] {

    const nodesWithParent: { node: T; parent: T }[] = [{
        node: root,
        parent: undefined
    }];


    f(root);

    return nodesWithParent;

    function f(root: T) {
        const children = getChildren(root);    
        for (const child of children) {
            nodesWithParent.push({
                node: child,
                parent: root
            });
            f(child);
        }
    }
}


// Create mapping of child id to parent id
function createParentMap<T>(
        //vertexMap: Map<T, T[]>): Map<T, T> {
        treeGraph: TreeGraph<T>): Map<T, T> {

    const { getChildren, root } = treeGraph;
    const parentMap: Map<T, T> = new Map();

    //const nodesWithParent = mapWithParent(getChildren, treeGraph.root);
    const nodesWithParent = mapWithParent(getChildren, root);

    for (const nodeWithParent of nodesWithParent) {
        const { node, parent  } = nodeWithParent;
        parentMap.set(node, parent);
    }

    //vertexMap.forEach((children, parent) => {
    //    if (!children) { return; }
    //    for (const child of children) {
    //        parentMap.set(child, parent);
    //    }
    //});

    return parentMap;
}


/**
 * Function to update the position map, adding the default
 * values for the position attributes if they do not already
 * exist in the map
 */
function updatePositionValue<T>(
        tree: TreeGraph<T>,
        node: T, 
        attributes: Partial<Position>) {

    const { positionMap } = tree;

    positionMap.set(node, {
        x: 0, y: 0, prelim: 0, mod: 0,
        ...positionMap.get(node),
        ...attributes
    });
}


// The current node's closest sibling node on the left.
function leftSibling<T>(tree: TreeGraph<T>, node: T) {
    const siblings = getSiblings(tree, node);
    const nodeIndex = siblings.indexOf(node);
    return nodeIndex > 0 ? siblings[nodeIndex - 1] : null;
}

// Array of all left siblings
function leftSiblings<T>(tree: TreeGraph<T>, node: T): T[] {
    const siblings = getSiblings(tree, node);
    return siblings.filter((curr, index) => index < siblings.indexOf(node));
}

// The current node's closest sibling node on the right
function rightSibling<T>(tree: TreeGraph<T>, node: T): T {
    const siblings = getSiblings(tree, node);
    const nodeIndex = siblings.indexOf(node);
    return siblings.length - 1 > nodeIndex ? siblings[nodeIndex + 1] : null;
}

// The current node's nearest neighbor to the left, at the same level
function leftNeighbor<T>(tree: TreeGraph<T>, node: T) {
    const { leftNeighborMap } = tree;
    return leftNeighborMap.get(node);
}


// Get siblings of a node (including the node itself)
function getSiblings<T>(treeGraph: TreeGraph<T>, node: T): T[] {
    //const { parentMap, vertexMap } = tree;
    const { parentMap, getChildren, root } = treeGraph;
    const parent = parentMap.get(node);

    if (!parent) { return [root]; }
    //return vertexMap.get(parent) || [];
    return getChildren(parent) || [];
}


// Whether or node the tree has a node
/*
function hasNode<T>(tree: TreeGraph<T>, node: T): boolean {
    const { vertexMap } = tree;
    return vertexMap.get(node) !== undefined;
}
*/

// Return whether the node is a leaf
function isLeaf<T>(treeGraph: TreeGraph<T>, node: T): boolean {
    //const { vertexMap } = treeGraph;
    const { getChildren } = treeGraph;
    return getChildren(node).length === 0;
    //return (vertexMap.get(node) || []).length === 0;
}

// Parent of the node
function parent<T>(tree: TreeGraph<T>, node: T): T {
    const { parentMap } = tree;
    return parentMap.get(node);
}

// Prelim position value of the node
function prelim<T>(tree: TreeGraph<T>, node: T): number {
    const { positionMap } = tree;
    const pos = positionMap.get(node);
    return pos ? pos.prelim : 0;
}

// The current node's x-coordinate
function xCoord<T>(tree: TreeGraph<T>, node: T): number {
    const { positionMap } = tree;
    const pos = positionMap.get(node);
    return pos ? pos.x : 0;
}

// The current node's y-coordinate
function yCoord<T>(tree: TreeGraph<T>, node: T): number {
    const { positionMap } = tree;
    const pos = positionMap.get(node);
    return pos ? pos.y : 0;
}

function getCoordinates<T>(tree: TreeGraph<T>, node: T): number[] {
    return [xCoord(tree, node), yCoord(tree, node)];
}

// The current node's modifier value
function modifier<T>(tree: TreeGraph<T>, node: T): number {
    const { positionMap } = tree;
    const pos = positionMap.get(node);
    return pos ? pos.mod : 0;
}

// The current node's leftmost offspring
function firstChild<T>(treeGraph: TreeGraph<T>, node: T): T {
    //const { vertexMap } = treeGraph;
    const { getChildren } = treeGraph;
    //const children = vertexMap.get(node) || [];
    const children = getChildren(node);
    return children.length > 0 ? children[0] : null;
}

// Get the prevNode for a given level
function prevNode<T>(tree: TreeGraph<T>, level: number): T {
    const { prevNodeMap } = tree;
    return prevNodeMap.get(level);
}

function hasLeftSibling<T>(tree: TreeGraph<T>, node: T): boolean {
    return leftSibling(tree, node) !== null;
}

function hasRightSibling<T>(tree: TreeGraph<T>, node: T): boolean {
    return rightSibling(tree, node) !== null;
}


/**
 * Return the mean node size of n nodes
 */
function meanNodeSize<T>(tree: TreeGraph<T>, nodes: T[]): number {
    const { getNodeSize } = tree;

    return nodes.map(getNodeSize).reduce((a, b) => a + b) / nodes.length;
}


export { 
    TreeGraph, Position, meanNodeSize,
    leftSibling, leftSiblings, rightSibling, leftNeighbor, getSiblings, 
    /*hasNode,*/ isLeaf, parent, prelim, xCoord, yCoord, getCoordinates, modifier, 
    firstChild, prevNode, hasLeftSibling, hasRightSibling, updatePositionValue,
    createTreeGraph, mapWithParent
}
