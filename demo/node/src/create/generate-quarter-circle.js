import { translate } from "flo-vector2d";
/**
 * Returns a cubic bezier curve that is an approximation of the unit quarter
 * circle in the first quadrant scaled and then translated.
 *
 * * see: [Approximate a circle with cubic Bézier curves](https://spencermortensen.com/articles/bezier-circle/)
 *
 * @doc mdx
 */
function generateQuarterCircle(scale, translation) {
    // the control point offset that best approximates a quarter circle (see
    // the link above)
    const c = 0.5519150244935105707435627;
    const s = scale;
    return [[0, s], [s * c, s], [s, s * c], [s, 0]].map(translate(translation));
}
export { generateQuarterCircle };
//# sourceMappingURL=generate-quarter-circle.js.map