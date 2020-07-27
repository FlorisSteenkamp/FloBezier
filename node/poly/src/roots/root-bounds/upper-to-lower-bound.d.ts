/**
 * Returns a function that returns a positive lower root bound given a function
 * that returns a positive upper root bound.
 * @param positiveUpperBoundFunction
 */
declare function upperToLowerBound(positiveUpperBoundFunction: (p: number[]) => number): (p: number[]) => number;
export { upperToLowerBound };
