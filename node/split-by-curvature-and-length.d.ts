/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
 * (t) values) such that each piece is flat within a given tolerance given by
 * maxFlatness and maxLength.
 * @param ps
 * @param maxFlatness
 * @param maxLength
 */
declare function splitByCurvatureAndLength(ps: number[][], maxFlatness?: number, maxLength?: number): number[];
export { splitByCurvatureAndLength };
