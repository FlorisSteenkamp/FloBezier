/**
 * Represents a root bracketing interval with the bracket limits given as
 * Shewchuk expansions.
 *
 * * **precondition:** `tE - tS` when calculated in double precision must be
 * exact - this is actually almost guaranteed due to a theorem stating that if
 * `|a - b| <= |a|` and `|a - b| <= |b|` then `a - b` is exact
 *
 * @doc
 */
interface RootIntervalExp {
    /** the minimum possible root value */
    tS: number[];
    /** the maximum possible root value */
    tE: number[];
    /**
     * the parity (even or odd) of the multiplicity or the exact multiplicity
     * depending on context
     */
    multiplicity: number;
}
export { RootIntervalExp };
