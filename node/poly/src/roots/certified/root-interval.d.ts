/**
 * Represents a root(s) bracketing interval
 *
 * * **precondition:** `tE - tS` when calculated in double precision must be
 * exact - this is actually almost guaranteed due to a theorem stating that if
 * `|a - b| <= |a|` and `|a - b| <= |b|` then `a - b` is exact
 *
 * @doc
 */
declare type RootInterval = {
    /** the minimum possible root value */
    tS: number;
    /** the maximum possible root value */
    tE: number;
    /**
     * the parity (even or odd) of the multiplicity or the exact multiplicity
     * depending on context
     */
    multiplicity: number;
};
/**
 * Simple function that creates and returns an exact root (with a bracketing
 * interval width of 0 and multiplicity 1)
 *
 * @param t
 *
 * @doc
 */
declare function createRootExact(t: number): RootInterval;
/**
 * Simple function that returns the middle of the root bracketing interval - can
 * be used to estimate the root
 *
 * @param ri a root interval
 *
 * @doc
 */
declare function mid(ri: RootInterval): number;
export { RootInterval, createRootExact, mid };
