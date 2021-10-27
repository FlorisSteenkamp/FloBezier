/**
 * Generates and returns an array of polynomials with random **roots** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * all roots will approximate real values so is not at all representative of
 * a natural random root distribution
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param n the number of polynomials to generate.
 * @param d the degree of the polynomials
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 * flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 * ```
 *
 * @doc
 */
declare const flatRootsArr: (n: number, d: number, a?: number | undefined, b?: number | undefined, seed?: number | undefined, odds?: number | undefined) => number[][];
/**
 * Generates and returns an array of polynomials with random **coefficients** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param n the number of polynomials to generate.
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 * flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 * ```
 *
 * @doc
 */
declare const flatCoefficientsArr: (n: number, d: number, a?: number | undefined, b?: number | undefined, seed?: number | undefined, odds?: number | undefined) => number[][];
/**
 * Returns a quasi-random number to be used as the next input to this function.
 *
 * * see [stackoverflow](https://stackoverflow.com/questions/3062746/special-simple-random-number-generator)
 *
 * @param seed
 *
 * @internal
 */
declare function predictiveRandom(seed: number): number;
/**
 * Generates and returns an array of polynomials with random **roots** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * also returns a new seed value that can be used as the input to the next
 * call to a predictive random function
 *
 * * all roots will approximate real values so is not at all representative of
 * a natural random root distribution
 *
 * * the exact same polynomial will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param d the degree of the polynomials
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatRoots(3,0,10); //=> { p: [1, -17.27247918024659, 97.33487287168995, -179.34094494147305], seed: 939629312 }
 * ```
 *
 * @doc
 */
declare function flatRoots(d: number, a?: number, b?: number, seed?: number, odds?: number): {
    p: number[];
    seed: number;
};
/**
 * Generates and returns an array of polynomials with random **coefficients** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * also returns a new seed value that can be used as the input to the next
 * call to a predictive random function
 *
 * * the exact same polynomial will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatCoefficients(3,-5,5); //=> { p: [0.437291506677866, -0.5087333917617798, 2.3439210653305054], seed: 939629312 }
 * ```
 *
 * @doc
 */
declare function flatCoefficients(d: number, a?: number, b?: number, seed?: number): {
    p: number[];
    seed: number;
};
export { flatRoots, flatRootsArr, flatCoefficients, flatCoefficientsArr, predictiveRandom };
