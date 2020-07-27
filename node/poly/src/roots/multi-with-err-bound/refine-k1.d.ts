import { RootIntervalExp } from "./root-interval-exp";
/**
 * Returns once compensated root(s).
 * * **precondition** the root has multiplicity === 1
  * @param tS Start of root interval - there is assumed exactly 1 root from tS
 * to tS + 4 ulps.
 * @param getPsExact function returning psExact
 */
declare function refineK1(tS: number, getPsExact: () => number[][][]): RootIntervalExp[];
export { refineK1 };
