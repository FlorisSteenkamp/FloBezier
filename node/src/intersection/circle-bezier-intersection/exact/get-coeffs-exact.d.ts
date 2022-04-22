/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of a circle
 * and a cubic bezier curve.
 *
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * the returned polynomial coefficients are exact (i.e. error-free)
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 *
 * @internal
 */
declare function getCoeffsCubicExact(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of a circle
 * and a quadratic bezier curve.
 *
 * The returned polynomial degree will be 4
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** none
 * * the returned polynomial coefficients are exact (i.e. error-free)
 *
 * @param circle a circle
 * @param ps a quadratic bezier curve
 */
declare function getCoeffsQuadraticExact(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of a circle
 * and a linear bezier curve (i.e. a line).
 *
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** none
 * * the returned polynomial coefficients are exact (i.e. error-free)
 *
 * @param circle a circle
 * @param ps a linear bezier curve
 */
declare function getCoeffsLinearExact(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
export { getCoeffsCubicExact, getCoeffsQuadraticExact, getCoeffsLinearExact };
