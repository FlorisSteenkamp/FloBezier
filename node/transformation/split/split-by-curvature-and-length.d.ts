/**
 * Split the order 0,1,2 or 3 bezier into pieces (given as an array of parameter
 * `t` values) such that each piece is flat within a given tolerance (where
 * curvature is measured by the `flatness` function).
 *
 * @param ps
 * @param maxFlatness
 * @param maxLength
 *
 * @doc
 */
declare function splitByCurvatureAndLength(ps: number[][], maxFlatness?: number, maxLength?: number): number[];
export { splitByCurvatureAndLength };
