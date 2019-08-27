/**
 * Calculates the curvature extrema brackets of the given cubic bezier.
 * See the paper at http://ac.els-cdn.com/S037704270000529X/1-s2.0-S037704270000529X-main.pdf?_tid=0b25a2cc-ad35-11e5-a728-00000aacb362&acdnat=1451288083_86359fc83af9dec3232c90a6d2e71031
 * Note that naming conventions is roughly as in the paper above.
 * @param ps
 */
declare function getCurvatureExtremaBrackets(ps: number[][]): {
    brackets: number[][];
    inflections: number[];
};
export { getCurvatureExtremaBrackets };
