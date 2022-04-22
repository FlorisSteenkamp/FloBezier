/**
 * Cubic node type
 *
 * These are the four types from the paper [Shape Analysis of Cubic Bézier Curves – Correspondence to Four Primitive Cubics](https://www.cad-journal.net/files/vol_11/CAD_11(5)_2014_568-578.pdf)
 */
declare type NodeType = 'crunode' | 'acnode' | 'cusp' | 'explicit';
interface ClassificationType {
    /** the order based on the number of control points */
    order: 0 | 1 | 2 | 3;
    /** the real order when considering degenerate cases */
    realOrder: 0 | 1 | 2 | 3;
    /** `true` if *all* points are collinear, false otherwise */
    collinear: boolean;
    nodeType: NodeType | 'n/a';
}
declare const point: {
    readonly order: 0;
    readonly realOrder: 0;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const lineGeneral: {
    readonly order: 1;
    readonly realOrder: 1;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const lineDegenPoint: {
    readonly order: 1;
    readonly realOrder: 0;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const quadGeneral: {
    readonly order: 2;
    readonly realOrder: 2;
    readonly collinear: false;
    readonly nodeType: "n/a";
};
/** The curve is collinear but not a line (i.e. evaluating at `t` values won't correspond to same points) */
declare const quadDegenCollinear: {
    readonly order: 2;
    readonly realOrder: 2;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const quadDegenLine: {
    readonly order: 2;
    readonly realOrder: 1;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const quadDegenPoint: {
    readonly order: 2;
    readonly realOrder: 0;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const cubicGeneralCrunode: {
    readonly order: 3;
    readonly realOrder: 3;
    readonly collinear: false;
    readonly nodeType: "crunode";
};
declare const cubicGeneralAcnode: {
    readonly order: 3;
    readonly realOrder: 3;
    readonly collinear: false;
    readonly nodeType: "acnode";
};
declare const cubicGeneralCusp: {
    readonly order: 3;
    readonly realOrder: 3;
    readonly collinear: false;
    readonly nodeType: "cusp";
};
declare const cubicGeneralExplicit: {
    readonly order: 3;
    readonly realOrder: 3;
    readonly collinear: false;
    readonly nodeType: "explicit";
};
declare const cubicDegenCollinearCubic: {
    readonly order: 3;
    readonly realOrder: 3;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const cubicDegenQuad: {
    readonly order: 3;
    readonly realOrder: 2;
    readonly collinear: false;
    readonly nodeType: "n/a";
};
declare const cubicDegenCollinearQuad: {
    readonly order: 3;
    readonly realOrder: 2;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const cubicDegenLine: {
    readonly order: 3;
    readonly realOrder: 1;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
declare const cubicDegenPoint: {
    readonly order: 3;
    readonly realOrder: 0;
    readonly collinear: true;
    readonly nodeType: "n/a";
};
/**
 * *All* possible planar polynomial bezier curves (of order <= 3) are
 * represented and all options are mutually exclusive.
 */
declare type Classification = typeof point | typeof lineGeneral | typeof lineDegenPoint | typeof quadGeneral | typeof quadDegenCollinear | typeof quadDegenLine | typeof quadDegenPoint | typeof cubicGeneralCrunode | typeof cubicGeneralAcnode | typeof cubicGeneralCusp | typeof cubicGeneralExplicit | typeof cubicDegenCollinearCubic | typeof cubicDegenQuad | typeof cubicDegenCollinearQuad | typeof cubicDegenLine | typeof cubicDegenPoint;
/**
 * The classifications form an equivalence class, in other words *all*
 * possible planar polynomial bezier curves (of order <= 3) are represented and
 * all options are mutually exclusive.
 */
declare const classifications: {
    point: {
        readonly order: 0;
        readonly realOrder: 0;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    lineGeneral: {
        readonly order: 1;
        readonly realOrder: 1;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    lineDegenPoint: {
        readonly order: 1;
        readonly realOrder: 0;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    quadGeneral: {
        readonly order: 2;
        readonly realOrder: 2;
        readonly collinear: false;
        readonly nodeType: "n/a";
    };
    quadDegenCollinear: {
        readonly order: 2;
        readonly realOrder: 2;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    quadDegenLine: {
        readonly order: 2;
        readonly realOrder: 1;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    quadDegenPoint: {
        readonly order: 2;
        readonly realOrder: 0;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    cubicGeneralCrunode: {
        readonly order: 3;
        readonly realOrder: 3;
        readonly collinear: false;
        readonly nodeType: "crunode";
    };
    cubicGeneralAcnode: {
        readonly order: 3;
        readonly realOrder: 3;
        readonly collinear: false;
        readonly nodeType: "acnode";
    };
    cubicGeneralCusp: {
        readonly order: 3;
        readonly realOrder: 3;
        readonly collinear: false;
        readonly nodeType: "cusp";
    };
    cubicGeneralExplicit: {
        readonly order: 3;
        readonly realOrder: 3;
        readonly collinear: false;
        readonly nodeType: "explicit";
    };
    cubicDegenCollinearCubic: {
        readonly order: 3;
        readonly realOrder: 3;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    cubicDegenQuad: {
        readonly order: 3;
        readonly realOrder: 2;
        readonly collinear: false;
        readonly nodeType: "n/a";
    };
    cubicDegenCollinearQuad: {
        readonly order: 3;
        readonly realOrder: 2;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    cubicDegenLine: {
        readonly order: 3;
        readonly realOrder: 1;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
    cubicDegenPoint: {
        readonly order: 3;
        readonly realOrder: 0;
        readonly collinear: true;
        readonly nodeType: "n/a";
    };
};
declare function isPoint(ps: number[][]): boolean;
declare function isLineGeneral(ps: number[][]): boolean;
declare function isLineDegenPoint(ps: number[][]): boolean;
declare function isQuadGeneral(ps: number[][]): boolean;
declare function isQuadDegenCollinear(ps: number[][]): boolean;
declare function isQuadDegenLine(ps: number[][]): boolean;
declare function isQuadDegenPoint(ps: number[][]): boolean;
declare function isCubicGeneralCrunode(ps: number[][]): boolean;
declare function isCubicGeneralAcnode(ps: number[][]): boolean;
declare function isCubicGeneralCusp(ps: number[][]): boolean;
declare function isCubicGeneralExplicit(ps: number[][]): boolean;
declare function isCubicDegenCollinearCubic(ps: number[][]): boolean;
declare function isCubicDegenQuad(ps: number[][]): boolean;
declare function isCubicDegenCollinearQuad(ps: number[][]): boolean;
declare function isCubicDegenLine(ps: number[][]): boolean;
declare function isCubicDegenPoint(ps: number[][]): boolean;
declare const classification: {
    isPoint: typeof isPoint;
    isLineGeneral: typeof isLineGeneral;
    isLineDegenPoint: typeof isLineDegenPoint;
    isQuadGeneral: typeof isQuadGeneral;
    isQuadDegenCollinear: typeof isQuadDegenCollinear;
    isQuadDegenLine: typeof isQuadDegenLine;
    isQuadDegenPoint: typeof isQuadDegenPoint;
    isCubicGeneralCrunode: typeof isCubicGeneralCrunode;
    isCubicGeneralAcnode: typeof isCubicGeneralAcnode;
    isCubicGeneralCusp: typeof isCubicGeneralCusp;
    isCubicGeneralExplicit: typeof isCubicGeneralExplicit;
    isCubicDegenCollinearCubic: typeof isCubicDegenCollinearCubic;
    isCubicDegenQuad: typeof isCubicDegenQuad;
    isCubicDegenCollinearQuad: typeof isCubicDegenCollinearQuad;
    isCubicDegenLine: typeof isCubicDegenLine;
    isCubicDegenPoint: typeof isCubicDegenPoint;
};
/**
 * Returns a classification of the given bezier curve.
 *
 * * **exact**: not susceptible to floating point round-off
 *
 * @param ps a bezier curve of order 0, 1, 2 or 3 given as an array of its
 * control points.
 *
 * @example
 * ```typescript
 * classify([[0,0],[3,3],[-3,3],[1,0]]);  // => { order: 3, realOrder: 3, collinear: false, nodeType: 'crunode'  }
 * ```
 *
 * @doc mdx
 */
declare function classify(ps: number[][]): Classification;
export { ClassificationType, Classification, NodeType, classify, classifications, classification };
