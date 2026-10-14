
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


export type { HausdorffDistanceOneSidedExtra, HausdorffDistanceExtra }
