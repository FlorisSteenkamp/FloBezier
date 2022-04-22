import { eEstimate } from "big-float-ts";
const estimate = eEstimate;
/**
 * Returns the resulting bezier curve when rounding each control point
 * coordinate (given as Shewchuk expansions) of the given bezier to double
 * precision.
 *
 * @param ps
 */
function toEstimation(ps) {
    return ps.map(p => p.map(c => estimate(c)));
}
export { toEstimation };
//# sourceMappingURL=to-estimation.js.map