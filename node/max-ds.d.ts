/**
 * Find the maximum change in curve length (s) due to a change in the parameter
 * (t)., i.e. max(ds/dt) for t ∈ [0,1]
 */
declare function maxDs(ps: number[][]): {
    ds: number;
    t: number;
};
export { maxDs };
