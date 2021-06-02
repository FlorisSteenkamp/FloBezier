import TreeGraph, { mapGet } from './tree-graph';

describe('TreeGraph', () => {
  let tree;
  let rootPosition;
  beforeEach(() => {
    rootPosition = { x: 50, y: 0, prelim: 0, mod: 0 };
    //         0
    //       / | \
    //     1   2   3
    //        / \
    //      4    5
    tree = new TreeGraph(
      new Map([
        [0, [1, 2, 3]],
        [1, []],
        [2, [4, 5]],
        [3, []],
        [4, []],
        [5, []],
      ]),
      new Map([[0, 2], [1, 3], [2, 4], [3, 4], [4, 4], [5, 4]]),
      [0, rootPosition],
    );
  });

  it('Should set the positionMap with the roots position', () => {
    expect(tree.positionMap.get(0)).toEqual(rootPosition);
  });

  describe('#hasNode', () => {
    it('Should return true for a node that exists in the tree', () => {
      expect(tree.hasNode(2)).toBe(true);
    });
    it('should return false for a node that does not exist', () => {
      expect(tree.hasNode(10)).toBe(false);
    });
  });

  describe('#isLeaf', () => {
    it('Should return true for a node that is a leaf', () => {
      expect(tree.isLeaf(4)).toBe(true);
    });
    it('Should return false for a node that is not a leaf', () => {
      expect(tree.isLeaf(0)).toBe(false);
    });
  });

  describe('#parent', () => {
    it('should get the correct parent node id', () => {
      expect(tree.parent(2)).toBe(0);
    });
    it('should return -1 for a node with no parent', () => {
      expect(tree.parent(0)).toBeNull();
    });
  });

  describe('#firstChild', () => {
    it('should return the correct first child id', () => {
      expect(tree.firstChild(0)).toBe(1);
    });
    it('should return -1 for a node with no children', () => {
      expect(tree.firstChild(4)).toBeNull();
    });
  });

  describe('#getSiblings', () => {
    it('should return the correct siblings', () => {
      expect(tree.getSiblings(2)).toEqual([1, 2, 3]);
    });
  });

  describe('#leftSibling', () => {
    it('should return the correct left sibling id', () => {
      expect(tree.leftSibling(2)).toBe(1);
    });
    it('should return -1 for a node with no left sibling', () => {
      expect(tree.leftSibling(4)).toBeNull();
    });
  });

  describe('#leftSiblings', () => {
    it('should return the correct left siblings', () => {
      expect(tree.leftSiblings(3)).toEqual([1, 2]);
    });
    it('should return an empty array for a node with no left siblings', () => {
      expect(tree.leftSiblings(4)).toEqual([]);
    });
  });

  describe('#mapGet', () => {
    it('should return the key if it exists', () => {
      const map = new Map([[1, 1]]);
      expect(mapGet(map, 1)).toBe(1);
    });
    it('should return the default value if the key does not exist', () => {
      const map = new Map([[1, 1]]);
      expect(mapGet(map, 0)).toBeNull();
    });
    it('should default to -1 if the value if the key does not exist and no defaultValue was provided', () => {
      const map = new Map([[1, 1]]);
      expect(mapGet(map, 0)).toBeNull();
    });
  });

  describe('#updatePositionValue', () => {
    it('should create the value and set the defaults if called with empty object', () => {
      tree.updatePositionValue(1, {});
      expect(tree.positionMap.get(1)).toEqual({
        x: 0,
        y: 0,
        prelim: 0,
        mod: 0,
      });
    });
    it('should merge existing attributes with ones passed in', () => {
      tree.positionMap = new Map([[0, { x: 10, y: 10, prelim: 0, mod: 0 }]]);
      tree.updatePositionValue(0, { prelim: 10, mod: 10 });
      expect(tree.positionMap.get(0)).toEqual({
        x: 10,
        y: 10,
        prelim: 10,
        mod: 10,
      });
    });
  });

  describe('#meanNodeSize', () => {
    it('should return the mean size of the nodes', () => {
      expect(tree.meanNodeSize([0, 1, 2])).toBe(3);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() => tree.meanNodeSize([])).toThrow();
    });
  });
});
