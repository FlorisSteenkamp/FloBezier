/**
 * Finds the osculating circles and inflection points for the given bezier.
 * @param ps
 */
declare function getCurvatureExtrema(ps: number[][]): {
    maxCurvatureTs: number[];
    maxNegativeCurvatureTs: number[];
};
export { getCurvatureExtrema };
