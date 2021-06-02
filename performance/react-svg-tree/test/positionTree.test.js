import TreeGraph, { mapGet } from './helpers/tree-graph';
import { checkExtendsRange, getLeftMost, firstWalk } from './helpers/positionTree';

describe('TreeGraph', () => {
  let tree;
  const rootPosition = { x: 50, y: 0, prelim: 0, mod: 0 };
  const options = {
    width: 200,
    height: 150,
    maxDepth: Infinity,
    levelSeparation: 4,
    siblingSeparation: 4,
    subtreeSeparation: 4,
  };
  beforeEach(() => {
    //              O
    //              |
    //     ----------------------
    //     |        |           |
    //     E        F           N
    //    |                    |
    //  -------            --------
    //  |     |            |      |
    //  A     D            G      M
    //        |                   |
    //     -------     ---------------------
    //     |     |     |    |    |    |    |
    //     B     C     H    I    J    K    L
    tree = new TreeGraph(
      new Map([
        ['O', ['E', 'F', 'N']],
        ['E', ['A', 'D']],
        ['F', []],
        ['N', ['G', 'M']],
        ['A', []],
        ['D', ['B', 'C']],
        ['G', []],
        ['M', ['H', 'I', 'J', 'K', 'L']],
        ['B', []],
        ['C', []],
        ['H', []],
        ['I', []],
        ['J', []],
        ['K', []],
        ['L', []],
      ]),
      new Map([
        ['A', 2],
        ['B', 2],
        ['C', 2],
        ['D', 2],
        ['E', 2],
        ['F', 2],
        ['G', 2],
        ['H', 2],
        ['I', 2],
        ['J', 2],
        ['K', 2],
        ['L', 2],
        ['M', 2],
        ['N', 2],
        ['O', 2],
      ]),
      ['O', rootPosition],
    );
  });

  describe('#firstWalk', () => {
    it('returns the correct x coordinates for each node', () => {
      const correctPositions = {
        A: { mod: 0, prelim: 0 },
        B: { mod: 0, prelim: 0 },
        C: { mod: 0, prelim: 6 },
        D: { mod: 3, prelim: 6 },
        E: { mod: 0, prelim: 3 },
        F: { mod: 4.5, prelim: 13.5 },
        G: { mod: 0, prelim: 0 },
        H: { mod: 0, prelim: 0 },
        I: { mod: 0, prelim: 6 },
        J: { mod: 0, prelim: 12 },
        K: { mod: 0, prelim: 18 },
        L: { mod: 0, prelim: 24 },
        M: { mod: -6, prelim: 6 },
        N: { mod: 21, prelim: 24 },
        O: { mod: 0, prelim: 13.5 },
      };
      firstWalk(tree, 'O', 0, options);
      let positions = {};
      tree.positionMap.forEach(
        ({ prelim, mod }, key) => (positions[key] = { prelim, mod }),
      );
      expect(positions).toEqual(correctPositions);
    });
  });

  describe('#getLeftMost', () => {
    it('Returns the node if the level is greater than or equal to the depth', () => {
      expect(getLeftMost(tree, 0, 5, 5)).toBe(0);
    });
    it('Returns null if the node is a leaf', () => {
      expect(getLeftMost(tree, 4, 0, 1)).toBeNull();
    });
    it('Returns the left most for a node at a depth of 1', () => {
      expect(getLeftMost(tree, 'O', 0, 1)).toBe('E');
      expect(getLeftMost(tree, 'G', 0, 1)).toBe('H');
    });
    it('Returns the left most for a node at a depth of 2', () => {
      expect(getLeftMost(tree, 'O', 0, 2)).toBe('A');
      expect(getLeftMost(tree, 'N', 0, 2)).toBe('H');
    });
  });

  describe('#checkExtendsRange', () => {
    const options = {
      width: 100,
      height: 100,
    };
    it('will return true if x and y are inside the range', () => {
      expect(checkExtendsRange(5, 5, options));
    });
    it('will return false if x is outside the range', () => {
      expect(checkExtendsRange(-10, 0, options));
      expect(checkExtendsRange(105, 0, options));
    });
    it('will return false if y is outside the range', () => {
      expect(checkExtendsRange(0, -10, options));
      expect(checkExtendsRange(0, 105, options));
    });
  });
});
