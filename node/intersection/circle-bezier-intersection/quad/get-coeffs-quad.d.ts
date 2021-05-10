/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 *
 * @doc
 */
declare function getCoeffsCubicQuad(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 * @param circle a circle
 * @param ps a quadratic bezier curve
 */
declare function getCoeffsQuadraticQuad(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 * @param circle a circle
 * @param ps a linear bezier curve
 */
declare function getCoeffsLinearQuad(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[][];
export { getCoeffsCubicQuad, getCoeffsQuadraticQuad, getCoeffsLinearQuad };
