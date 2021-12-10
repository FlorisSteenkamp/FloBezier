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
/**
 * TODO docs
 *
 * * exact
 *
 * @param ps a bezier curve of order 0, 1, 2 or 3 given as an array of its
 * control points.
 *
 * @doc mdx
 */
declare function classify(ps: number[][]): Classification;
export { classify, classifications };
