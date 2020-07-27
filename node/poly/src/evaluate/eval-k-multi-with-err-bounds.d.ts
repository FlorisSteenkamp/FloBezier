/**
 * Returns the result of evaluating the given polynomial at x such that the sign
 * is correct when positive or negative and not decidable when the sign is 0.
 * * if zero is returned then the result was too close to 0 to evaluate accurately.
 * @param p a multi-polynomial, ordered by most significant 'coefficients' first
 * @param pE an error polynomial - all coefficients must be positive
 * @param x an evaluation point
 * @param multiplier the error needs to be a multiple of this number smaller
 * than the evaluated value, otherwise zero is returned
 */
declare function evalK1MultiWithErrBounds(p: number[][], pE: number[], x: number, multiplier?: number): {
    r̂: number;
    e: number;
};
export { evalK1MultiWithErrBounds };
