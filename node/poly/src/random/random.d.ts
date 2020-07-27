/**
 * Generates an array of random polynomials with parameters as specified
 * by flatRoots. The exact same polynomials will be created on each
 * call to this function if the same seed is used - this is by design to
 * improve testability.
 * @memberof Random
 * @param n - The number of polynomials to generate.
 * @param d - The degree of the polynomials
 * @param a - The lower bound of the distribution - defaults
 * to 0
 * @param b - The upper bound of the distribution - defaults
 * to 1
 * @param seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @param odds - The odds that a root will be doubled (applied
 * recursively so that some roots will be tripled, etc. - defaults to 0
 * @example
 * FloPoly.Random.flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 * FloPoly.Random.flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 */
declare let flatRootsArr: (n: number, d: number, a: number, b: number, seed?: number, odds?: number) => number[][];
/**
 * Generates and returns an array of random polynomials as specified by
 * flatCoefficients. The exact same polynomials will be created on each
 * call to this function if the same seed is used - this is by design to
 * improve testability.
 *
 * @memberof Random
 * @param n The number of polynomials to generate.
 * @param d The degree of the polynomials
 * @param a The lower bound of the distribution - defaults to 0
 * @param b The upper bound of the distribution - defaults to 1
 * @param seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @example
 * flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 * flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 */
declare let flatCoefficientsArr: (n: number, d: number, a: number, b: number, seed?: number, odds?: number) => number[][];
/**
 * Returns a quasi-random number to be used as the next input to this function.
 * See https://stackoverflow.com/questions/3062746/special-simple-random-number-generator
 * @private
 * @param seed
 */
declare function predictiveRandom(seed: number): number;
/**
 * Generates a random polynomial with roots picked from a bounded flat
 * distribution (i.e. a rectangular distribution) with specified odds of
 * duplication of consecutive values. Note that the resulting polynomial
 * won't have any complex roots.
 * @memberof Random
 * @param d - The degree of the polynomials
 * @param a - The lower bound of the distribution - defaults
 * to 0
 * @param b - The upper bound of the distribution - defaults
 * to 1
 * @param seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @param odds - The odds that a root will be doubled (applied
 * recursively so that some roots will be tripled, etc. - defaults to 0
 * @example
 * FloPoly.Random.flatRoots(3,0,10); //=> { p: [1, -17.27247918024659, 97.33487287168995, -179.34094494147305], seed: 939629312 }
 */
declare function flatRoots(d: number, a?: number, b?: number, seed?: number, odds?: number): {
    p: number[];
    seed: number;
};
/**
 * Generates a random polynomial with coefficients picked from a bounded
 * flat distribution (i.e. a rectangular distribution).
 * @memberof Random
 * @param d - The degree of the polynomials
 * @param a - The lower bound of the distribution - defaults to -1
 * @param b - The upper bound of the distribution - defaults to 1
 * @param seed - A seed value for generating random values (so that the results
 * are reproducable)
 * @example
 * FloPoly.Random.flatCoefficients(3,-5,5); //=> { p: [0.437291506677866, -0.5087333917617798, 2.3439210653305054], seed: 939629312 }
 */
declare function flatCoefficients(d: number, a?: number, b?: number, seed?: number): {
    p: number[];
    seed: number;
};
export { flatRoots, flatRootsArr, flatCoefficients, flatCoefficientsArr, predictiveRandom };
