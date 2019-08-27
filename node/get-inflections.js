"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_curvature_extrema_brackets_1 = require("./get-curvature-extrema/get-curvature-extrema-brackets");
function getInflections(ps) {
    return get_curvature_extrema_brackets_1.getCurvatureExtremaBrackets(ps).inflections;
}
exports.getInflections = getInflections;
//# sourceMappingURL=get-inflections.js.map