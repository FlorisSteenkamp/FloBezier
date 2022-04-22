import { translate } from "flo-vector2d";
/**
 * Returns a cubic bezier curve that is an approximation of the unit quarter
 * circle in the first quadrant scaled and then translated.
 *
 * * see: [Approximate a circle with cubic Bézier curves](https://spencermortensen.com/articles/bezier-circle/)
 */
function generateQuarterCircle(scale, translation) {
    // `c` can be made slightly more accurate by calculating a more accurate
    // value of 
    const c = 0.551915024494;
    const s = scale;
    return [[0, s], [s * c, s], [s, s * c], [s, 0]].map(translate(translation));
}
export { generateQuarterCircle };
//# sourceMappingURL=generate-quarter-circle.js.map