
/**
 * The one-sided Hausdorff distance from `A` to `B` together with the parameter
 * values and points at which the distance is (approximately) achieved.
 */
interface HausdorffDistanceOneSidedExtra {
    /** the (approximate) one-sided Hausdorff distance `h(A,B)` */
    readonly d: number;
    /** the parameter on `A` where the supremum is (approximately) achieved */
    readonly tA: number;
    /** the point on `A` at parameter `tA` */
    readonly pA: number[];
    /** the parameter on `B` of the closest point on `B` to `pA` */
    readonly tB: number;
    /** the closest point on `B` to `pA` */
    readonly pB: number[];
}


/**
 * The (two-sided) Hausdorff distance between two bezier curves together with the
 * parameter values and points on both curves where the distance is
 * (approximately) achieved.
 */
interface HausdorffDistanceExtra extends HausdorffDistanceOneSidedExtra {
    /** the (approximate) two-sided Hausdorff distance `H(A,B)` */
    readonly d: number;
    /** which one-sided distance achieved the maximum: `'ab'` = `h(A,B)`, `'ba'` = `h(B,A)` */
    readonly side: 'ab' | 'ba';
    /**
     * the parameter on `A`; if `side === 'ab'` this is where the supremum is
     * (approximately) achieved, else it is that of the closest point on `A`
     * to `pB`
     */
    readonly tA: number;
    /**
     * the point on `A` at parameter `tA`; if `side === 'ab'` this is the
     * furthest point from `B`, else it is the closest point on `A` to `pB`
     */
    readonly pA: number[];
    /**
     * the parameter on `B`; if `side === 'ba'` this is where the supremum is
     * (approximately) achieved, else it is that of the closest point on `B`
     * to `pA`
     */
    readonly tB: number;
    /**
     * the point on `B` at parameter `tB`; if `side === 'ba'` this is the
     * furthest point from `A`, else it is the closest point on `B` to `pA`
     */
    readonly pB: number[];
}


/**
 * Certified bounds on the one-sided Hausdorff distance `h(A,B)` from a bezier
 * curve `A` to a (piecewise) bezier curve `B`, together with the parameter
 * values and points at which the lower bound is achieved.
 */
interface HausdorffDistanceOneSidedBounds {
    /**
     * a lower bound on `h(A,B)`; this is the distance from `pA` to `B` and
     * is in general a *much* more accurate approximation of `h(A,B)` than
     * `upper`
     */
    readonly lower: number;
    /** an upper bound on `h(A,B)` */
    readonly upper: number;
    /** the parameter on `A` where the lower bound is achieved */
    readonly tA: number;
    /** the point on `A` at parameter `tA` */
    readonly pA: number[];
    /** the index of the piece of `B` on which `pB` lies (`0` if `B` is a single curve) */
    readonly kB: number;
    /** the parameter on piece `kB` of `B` of the closest point on `B` to `pA` */
    readonly tB: number;
    /** the closest point on `B` to `pA` */
    readonly pB: number[];
}


/**
 * The options of `hausdorffDistanceOneSidedBounds`.
 */
interface HausdorffDistanceOneSidedBoundsOptions {
    /**
     * stop once the lower bound is `>= lowerStop`, i.e. once `h(A,B)` is
     * certainly at least `lowerStop`; defaults to `Infinity` (never)
     */
    readonly lowerStop?: number | undefined;
    /**
     * stop once the upper bound is `<= upperStop`, i.e. once `h(A,B)` is
     * certainly at most `upperStop`; defaults to `-Infinity` (never)
     */
    readonly upperStop?: number | undefined;
    /**
     * stop once `upper - lower < tolerance`; if *none* of `lowerStop`,
     * `upperStop` and `tolerance` is given it defaults to
     * `max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`, otherwise
     * this rule is not used unless given
     */
    readonly tolerance?: number | undefined;
    /**
     * the maximum number of interval bisections after which the bounds are
     * returned as they are; defaults to `50`
     */
    readonly maxIterations?: number | undefined;
}


export type {
    HausdorffDistanceOneSidedExtra, HausdorffDistanceExtra,
    HausdorffDistanceOneSidedBounds, HausdorffDistanceOneSidedBoundsOptions
}
