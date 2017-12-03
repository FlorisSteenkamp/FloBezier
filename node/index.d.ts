import { ICurriedMapFunction2 } from 'flo-vector2d';
import { ICurriedMapFunctionSpecial } from 'flo-vector2d';
/**
 * <p>
 * Purely functional cubic bezier library, including robust
 * cubic-cubic bezier intersection.
 * </p>
 * <p>
 * A cubic bezier is represented as an array of points, i.e.
 * [p0, p1, p2, p3] where each point is an ordered pair, e.g.
 * [[0,0],[1,1],[2,1],[3,0]].
 * </p>
 */
declare const Bezier3: {
    rotate: ICurriedMapFunctionSpecial<number, number, number[], number[]>;
    getX: (a: number[][]) => number[];
    getY: (a: number[][]) => number[];
    getDx: (a: number[][]) => number[];
    getDy: (a: number[][]) => number[];
    getDdx: (a: number[][]) => number[];
    getDdy: (a: number[][]) => number[];
    getDddx: (a: number[][]) => number[];
    getDddy: (a: number[][]) => number[];
    getBounds: (a: number[][]) => {
        ts: number[][];
        box: number[][];
    };
    bezier3Intersection: (ps1: number[][], ps2: number[][], δ: number, Δ: number) => number[][];
    lineIntersection: (ps: number[][], l: number[][]) => number[];
    tsAtX: (ps: number[][], x: number) => number[];
    tsAtY: (ps: number[][], y: number) => number[];
    getBoundingHull: (a: number[][]) => number[][];
    fromLine: (l: number[][]) => number[][];
    translate: ICurriedMapFunction2<number[], number[], number[]>;
    evaluate: {
        (ps: number[][]): (t: number) => number[];
        (ps: number[][], t: number): number[];
    };
    κ: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    dκMod: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    curvature: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    tangent: {
        (ps: number[][], t: number): number[];
        (ps: number[][]): (t: number) => number[];
    };
    normal: {
        (ps: number[][], t: number): number[];
        (ps: number[][]): (t: number) => number[];
    };
    totalCurvature: {
        (ps: number[][], interval: number[]): number;
        (ps: number[][]): (interval: number[]) => number;
    };
    totalAbsoluteCurvature: {
        (ps: number[][], interval: number[]): number;
        (ps: number[][]): (interval: number[]) => number;
    };
    len: {
        (interval: number[], ps: number[][]): number;
        (interval: number[]): (ps: number[][]) => number;
    };
    getTAtLength: {
        (ps: number[][], s: number): number;
        (ps: number[][]): (s: number) => number;
    };
    evaluateX: {
        (ps: number[][]): (t: number) => number;
        (ps: number[][], t: number): number;
    };
    evaluateY: {
        (ps: number[][]): (t: number) => number;
        (ps: number[][], t: number): number;
    };
    evaluateDx: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    evaluateDy: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    evaluateDdx: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    evaluateDdy: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    evaluateDddx: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    evaluateDddy: {
        (ps: number[][], t: number): number;
        (ps: number[][]): (t: number) => number;
    };
    getBoundingBoxTight: (a: number[][]) => number[][];
    getBoundingBox: (a: number[][]) => number[][];
    fromTo: (ps: number[][]) => (t1: number, t2: number) => number[][];
    splitAt: (ps: number[][], t: number) => number[][][];
    scale: (ps: number[][], factor: number) => number[][];
    toCubic: (ps: number[][]) => number[][];
    toQuadratic: (ps: number[][]) => number[][];
    toHybridQuadratic: (ps: number[][]) => (number[] | number[][])[];
    evaluateHybridQuadratic: (hq: (number[] | number[][])[], t: number, th: number) => number[];
    evaluateQuadratic: (ps: number[][], t: number) => number[];
    evaluateLinear: (ps: number[][], t: number) => number[];
    coincident: (P: number[][], Q: number[][], δ?: number) => {
        p: number[];
        q: number[];
    };
    from0ToT: (ps: number[][], t: number) => number[][];
    fromTTo1: (ps: number[][], t: number) => number[][];
    clone: (ps: number[][]) => number[][];
    reverse: (ps: number[][]) => number[][];
};
export interface BezierPoint {
    p: number[];
    t: number;
}
export default Bezier3;
