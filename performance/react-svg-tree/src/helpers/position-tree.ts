import { 
    meanNodeSize, TreeGraph, xCoord, yCoord, prelim, prevNode, isLeaf,
    leftSibling, firstChild, hasRightSibling, rightSibling, leftNeighbor,
    parent, modifier, updatePositionValue
} from './tree-graph';
import { TreeProps, TreePropsAllRequired } from './tree-props';


/**
 * This file contains the code necessary for the correct aesthetic positioning
 * of nodes in a tree. 
 * 
 * The algorithm was modified from http://www.cs.unc.edu/techreports/89-034.pdf
 * 
 * @author Zachary Marion
 */


/**
 * Function that optimally positions the x coordinates of all nodes in
 * a tree for aesthetics. Adapted from http://www.cs.unc.edu/techreports/89-034.pdf
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param options Options for the positioning
 * @return {boolean} true if the tree fits and false if it does not
 */
function positionTree<T>(
        tree: TreeGraph<T>,
        node: T,
        options: TreePropsAllRequired<T>): boolean {

    // Do the preliminary positioning with a postorder walk
    firstWalk(tree, node, 0, options);
    // Determine how to adjust all the nodes with respect to
    // the location of the root.
    tree.xTopAdjustment = xCoord(tree, node) - prelim(tree, node);
    tree.yTopAdjustment = yCoord(tree, node);

    return secondWalk(tree, node, 0, 0, options);
}


/**
 * First walk of the tree, where we compute the preliminary
 * position values for the node placement
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth of the tree
 * @param options Options for the positioning
 */
function firstWalk<T>(
        tree: TreeGraph<T>,
        node: T,
        level: number,
        options: TreeProps<T>) {

    tree.leftNeighborMap.set(node, prevNode(tree, level));
    tree.prevNodeMap.set(level, node);

    if (isLeaf(tree, node)) {
        const leftSibling_ = leftSibling(tree, node);
        if (leftSibling_ !== null) {
            // Determine the preliminary x-coordinate based on:
            // 1. The preliminary x-coordinate of the left sibling,
            // 2. The separation between sibling nodes, and
            // 3. The mean size of left sibling and current node.
            const prelim_ =
                prelim(tree, leftSibling_) +
                options.siblingSeparation +
                meanNodeSize(tree, [leftSibling_, node]);

            updatePositionValue(tree, node, { prelim: prelim_ });
        } else {
            // No sibling on the left to worry about
            updatePositionValue(tree, node, { prelim: 0 });
        }
    } else {
        // This Node is not a leaf, so call this procedure
        // recursively for each of its offspring.
        let leftMost = firstChild(tree, node);
        let rightMost = leftMost;
        firstWalk(tree, leftMost, level + 1, options);

        while (hasRightSibling(tree, rightMost)) {
            rightMost = rightSibling(tree, rightMost);
            firstWalk(tree, rightMost, level + 1, options);
        }

        const midPoint = (prelim(tree, leftMost) + prelim(tree, rightMost)) / 2;
        const leftSibling_ = leftSibling(tree, node);

        if (leftSibling_ !== null) {
            const prelim_ =
                prelim(tree, leftSibling_) +
                options.siblingSeparation +
                meanNodeSize(tree, [leftSibling_, node]);
                
            const mod = prelim_ - midPoint;
            updatePositionValue(tree, node, { prelim: prelim_, mod });
            apportion(tree, node, level, options);
        } else {
            updatePositionValue(tree, node, { prelim: midPoint });
        }
    }
}


/**
 * Apportion the tree
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth of the tree
 * @param options Options for the positioning
 */
function apportion<T>(
        tree: TreeGraph<T>,
        node: T,
        level: number,
        options: TreeProps<any>) {

    let leftMost = firstChild(tree, node);
    // THIS SHOULD BE C BUT IT IS STILL D
    let neighbor = leftNeighbor(tree, leftMost);
    let compareDepth = 1;

    while (leftMost !== null && neighbor !== null) {

        // Compute the location of leftmost and where it should
        // be with respect to neighbor.
        let leftModsum = 0;
        let rightModsum = 0;
        let ancestorLeftMost: T = leftMost;
        let ancestorNeighbor: T = neighbor;

        for (let i = 0; i < compareDepth; i++) {
        ancestorLeftMost = parent(tree, ancestorLeftMost);
        ancestorNeighbor = parent(tree, ancestorNeighbor);
        rightModsum = rightModsum + modifier(tree, ancestorLeftMost);
        leftModsum = leftModsum + modifier(tree, ancestorNeighbor);
        }
        // Find the moveDistance, and apply it to Node's subtree.
        // Add appropriate portions to smaller interior subtrees.
        let moveDistance =
            prelim(tree, neighbor) +
            leftModsum +
            options.subtreeSeparation +
            meanNodeSize(tree, [leftMost, neighbor]) - (prelim(tree, leftMost) + rightModsum);

        if (moveDistance > 0) {
            // Count interior sibling subtrees in LeftSiblings
            let temp = node;
            let leftSiblings = 0;
            while (temp !== null && temp !== ancestorNeighbor) {
                leftSiblings += 1;
                temp = leftSibling(tree, temp);
            }
            if (temp !== null) {
                // Apply portions to appropriate leftsibling subtrees
                const portion = moveDistance / leftSiblings;
                temp = node;
                while (temp !== ancestorNeighbor) {
                const prelim_ = prelim(tree, temp) + moveDistance;
                const mod = modifier(tree, temp) + moveDistance;
                moveDistance = moveDistance - portion;
                updatePositionValue(tree, temp, { prelim: prelim_, mod });
                temp = leftSibling(tree, temp);
                }
            } else {
                // Don't need to move anything--it needs to
                // be done by an ancestor because
                // AncestorNeighbor and AncestorLeftmost are
                // not siblings of each other.
                return;
            }
        }
        // Determine the leftmost descendant of Node at the next
        // lower level to compare its positioning against that of
        // its Neighbor.
        compareDepth += 1;
        leftMost = isLeaf(tree, leftMost)
        ? getLeftMost(tree, node, 0, compareDepth)
        : firstChild(tree, leftMost);
        neighbor = leftNeighbor(tree, leftMost);
    }
}

/**
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level refers to the level below the node whose leftmost
 * descendant is being found.
 * This is not the absolute level used in the main walks
 * @param depth The compare depth
 */
function getLeftMost<T>(
        tree: TreeGraph<T>,
        node: T,
        level: number,
        depth: number): T {

    if (level >= depth) return node;
    let leftMost = node;
    while (firstChild(tree, leftMost) === null && hasRightSibling(tree, leftMost)) {
        leftMost = rightSibling(tree, leftMost);
    }
    leftMost = firstChild(tree, leftMost);
    return getLeftMost(tree, leftMost, level + 1, depth);
}

/**
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth
 * @param modSum ???
 */
function secondWalk<T>(
        tree: TreeGraph<T>,
        node: T,
        level: number,
        modSum: number,
        options: TreePropsAllRequired<T>): boolean {

    let result = true;
    
    let xTemp = tree.xTopAdjustment + prelim(tree, node) + modSum;
    let yTemp = tree.yTopAdjustment + level * options.levelSeparation;
    // Check to see that xTemp and yTemp fit within the viewing rect
    //if (!checkExtendsRange(xTemp, yTemp, options)) {
        //return false;
    //}

    updatePositionValue(tree, node, { x: xTemp, y: yTemp });
    if (!isLeaf(tree, node)) {
        // Apply the modifier value for this node to all its offspring
        result = secondWalk(
            tree,
            firstChild(tree, node),
            level + 1,
            modSum + modifier(tree, node),
            options,
        );
    }

    if (result && hasRightSibling(tree, node)) {
        result = secondWalk(
            tree,
            rightSibling(tree, node),
            level,
            modSum,
            options,
        );
    }

    return result;
}


/**
 * Check that a pair of x,y coordinates can be rendered inside the svg box
 *
 * @param x The x coordinate of the node
 * @param y The y coordinate of the node
 * @param options Options for the positioning
 */
/*
function checkExtendsRange(
        x: number,
        y: number,
        options: { width: number, height: number }): boolean {

    return x >= 0 && x <= options.width && y >= 0 && y <= options.height;
}
*/

export { positionTree, TreeProps as TreeOptions }
