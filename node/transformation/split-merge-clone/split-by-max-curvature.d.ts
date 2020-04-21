/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
 * (t) values) such that each piece is flat within a given tolerance given by
 * the flatness function.
 * @param ps
 * @param tolerance Maximum tolerance (must be > 1) for flatness measure.
 */
declare function splitByMaxCurvature(ps: number[][], tolerance?: number): number[];
export { splitByMaxCurvature };
