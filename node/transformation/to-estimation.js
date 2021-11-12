import { eEstimate } from "big-float-ts";
const estimate = eEstimate;
function toEstimation(ps) {
    return ps.map(p => p.map(c => estimate(c)));
}
export { toEstimation };
//# sourceMappingURL=to-estimation.js.map