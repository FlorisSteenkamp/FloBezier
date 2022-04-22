import type { Iteration } from './iteration.js';
/**
 * A type that holds debug information if there exists a global variable
 * named `__debug__` having this type.
 *
 * @internal
 */
interface __Debug__ {
    /**
     * true if debug info has already been gathered; only the first call to
     * the algorithm will have its debug info gathered
     */
    already: boolean;
    /** the root of the iteration tree */
    tree: (Iteration & IterationExtras) | undefined;
    /** the current iteration; only used *during* debug info gathering */
    currentIter: Iteration & IterationExtras;
    /** current serial uid number to assign to the next iteration */
    uid: number;
    maxItersCount: number;
}
/**
 * Represents a fatline in the geometric interval bezier-bezier intersection
 * algorithm.
 *
 * @internal
 */
interface Fatline {
    /** two points identifying the base line of the fatline */
    psBase: number[][];
    /** two points identifying the min line of the fatline */
    psMin: number[][];
    /** two points identifying the max line of the fatline */
    psMax: number[][];
}
/**
 * Extra debug information added to each iteration if there exists a global
 * variable named `__debug__` of type `__Debug__`.
 *
 * @internal
 */
interface IterationExtras {
    /** some random id uniquely identifying this iteration */
    uid?: number;
    /** the bezier curve of this iteration that will be fatline clipped */
    F_?: {
        ps: number[][];
        _ps: number[][];
    };
    /** the bezier curve of this iteration that will be geo clipped */
    G_?: {
        ps: number[][];
        _ps: number[][];
    };
    /** this iteration's fatline */
    fatline?: Fatline;
    /** this iteration's perpendicular fatline (if it exists) */
    fatlinePerp?: Fatline | undefined;
    /** this iteration's hybrid quadratic curve */
    hq?: number[][];
    /** this iteration's children within the iteration tree */
    children?: (Iteration & IterationExtras)[];
    /**
     * true if an accurate enough intersection was found during this
     * iteration, false otherwise
     */
    foundX?: boolean;
    parent?: Iteration & IterationExtras;
    geo?: {
        /** first point of hybrid quadratic */
        dH0: {
            dMin: number;
            dMax: number;
        };
        /** mid point of hybrid quadratic - start */
        dH10: {
            dMin: number;
            dMax: number;
        };
        /** mid point of hybrid quadratic - end */
        dH11: {
            dMin: number;
            dMax: number;
        };
        /** last point of hybrid quadratic */
        dH2: {
            dMin: number;
            dMax: number;
        };
        dMin: number;
        dMax: number;
    };
    geoPerp?: {
        /** first point of hybrid quadratic */
        dH0: {
            dMin: number;
            dMax: number;
        };
        /** mid point of hybrid quadratic - start */
        dH10: {
            dMin: number;
            dMax: number;
        };
        /** mid point of hybrid quadratic - end */
        dH11: {
            dMin: number;
            dMax: number;
        };
        /** last point of hybrid quadratic */
        dH2: {
            dMin: number;
            dMax: number;
        };
        dMin: number;
        dMax: number;
    };
}
export { __Debug__, Fatline, IterationExtras };
