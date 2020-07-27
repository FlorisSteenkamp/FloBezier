/**
 * Returns a function that returns a negative root bound given a function that
 * returns a positive root bound.
 * @param positiveBoundFunction
 */
declare function positiveToNegativeBound(positiveBoundFunction: (p: number[]) => number): (p: number[]) => number;
export { positiveToNegativeBound };
