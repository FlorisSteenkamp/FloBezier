"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const get_curvature_extrema_brackets_1 = require("./get-curvature-extrema-brackets");
const curvature_1 = require("../curvature");
const index_1 = require("../index");
/**
 * Finds the osculating circles and inflection points for the given bezier.
 * @param ps
 */
function getCurvatureExtrema(ps) {
    if (ps.length === 2) {
        return { maxCurvatureTs: [], maxNegativeCurvatureTs: [] };
    }
    else if (ps.length === 3) {
        // See e.g. https://math.stackexchange.com/a/2971112
        // TODO
        return { maxCurvatureTs: [], maxNegativeCurvatureTs: [] };
    }
    let maxCurvatureTs = [];
    let maxNegativeCurvatureTs = [];
    let brackets = get_curvature_extrema_brackets_1.getCurvatureExtremaBrackets(ps).brackets;
    let κPs = curvature_1.κ(ps); // The curvature function
    let lenb = brackets.length;
    for (let k = 0; k < lenb; k++) {
        let bracket = brackets[k];
        if (!bracket) {
            continue;
        }
        let root = lookForRoot(ps, bracket);
        if (!root) {
            continue;
        }
        let κ_ = -κPs(root);
        // Check if local extrema is a maximum or minimum.
        let κAtMinsd = -κPs(bracket[0]);
        let κAtMaxsd = -κPs(bracket[1]);
        if (κ_ > κAtMinsd && κ_ > κAtMaxsd) {
            // maximum
            if (κ_ > 0) {
                maxCurvatureTs.push(root);
            }
        }
        else if (κ_ <= κAtMinsd && κ_ <= κAtMaxsd) {
            // minimum
            if (κ_ < 0) {
                maxNegativeCurvatureTs.push(root);
            }
        }
    }
    return { maxCurvatureTs, maxNegativeCurvatureTs };
}
exports.getCurvatureExtrema = getCurvatureExtrema;
function lookForRoot(ps, [minsd, maxsd]) {
    // At this point there can be exactly 0 or 1 roots within 
    // [minsd, maxsd]
    let dκMod_ = index_1.dκMod(ps);
    let c0 = dκMod_(minsd);
    let c1 = dκMod_(maxsd);
    if (c0 * c1 >= 0) {
        return;
    }
    // There is exactly one root in the interval.
    let root = flo_poly_1.brent(dκMod_, minsd, maxsd);
    return root;
}
//# sourceMappingURL=get-curvature-extrema.js.map