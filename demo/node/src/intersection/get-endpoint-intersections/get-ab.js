import { toPowerBasisExact } from "../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { ensureRange } from "./ensure-range.js";
import { erEstimate } from "./er-estimate.js";
import { erSign } from "./er-sign.js";
/** @internal */
function getAB(getTransform) {
    return (psA, psB) => {
        const xyA = toPowerBasisExact(psA);
        const xyB = toPowerBasisExact(psB);
        const xyAR = toPowerBasisExact(psA.slice().reverse());
        const xyBR = toPowerBasisExact(psB.slice().reverse());
        const d = getTransform(xyA, xyB);
        const d_AR = getTransform(xyAR, xyB);
        const d_BR = getTransform(xyA, xyBR);
        const d_ARBR = getTransform(xyAR, xyBR);
        // Get the *certified* sign of `tA_B0 - 1`.
        const sgn_tA_B0_min1 = -erSign(d_AR);
        const sgn_tA_B1_min1 = -erSign(d_ARBR);
        const _tA_B0 = erEstimate(d);
        const _tA_B1 = erEstimate(d_BR);
        const tA_B0 = ensureRange(_tA_B0, sgn_tA_B0_min1);
        const tA_B1 = ensureRange(_tA_B1, sgn_tA_B1_min1);
        return [tA_B0, tA_B1];
    };
}
export { getAB };
//# sourceMappingURL=get-ab.js.map