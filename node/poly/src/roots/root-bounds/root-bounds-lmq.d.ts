/**
 * Returns an upper bound for the positive real roots of the given
 * polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * @param p a polynomial
 * @example
 * positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436
 * positiveRootUpperBound_LMQ([2,3]);           //=> 0
 * positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 */
declare function positiveRootUpperBound_LMQ(p: number[]): number;
/** Returns a positive lower bound of the roots of the given polynomial */
declare let positiveRootLowerBound_LMQ: (p: number[]) => number;
/**
 * Returns a negative upper (upper here means further from zero) bound of the
 * roots of the given polynomial .
 */
declare let negativeRootUpperBound_LMQ: (p: number[]) => number;
/**
 * Returns a negative lower (lower here means closer to zero) bound of the roots
 * of the given polynomial.
 */
declare let negativeRootLowerBound_LMQ: (p: number[]) => number;
export { positiveRootUpperBound_LMQ, positiveRootLowerBound_LMQ, negativeRootUpperBound_LMQ, negativeRootLowerBound_LMQ };
