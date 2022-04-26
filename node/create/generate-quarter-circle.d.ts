/**
 * Returns a cubic bezier curve that is an approximation of the unit quarter
 * circle in the first quadrant scaled and then translated.
 *
 * * see: [Approximate a circle with cubic Bézier curves](https://spencermortensen.com/articles/bezier-circle/)
 *
 * @doc mdx
 */
declare function generateQuarterCircle(scale: number, translation: number[]): number[][];
export { generateQuarterCircle };
