import { transform } from './transform.js';


/**
 * Returns the given bezier curve reflected (flipped) about the line (axis)
 * through the two given points.
 * 
 * * the two axis points must be distinct
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p1 a point on the axis, e.g. `[1,2]`
 * @param p2 another (distinct) point on the axis, e.g. `[3,4]`
 * 
 * @doc mdx
 */
function flipAbout(
        ps: number[][],
        p1: number[],
        p2: number[]): number[][] {

    const [ax, ay] = p1;
    const dx = p2[0] - ax;
    const dy = p2[1] - ay;

    const L = dx*dx + dy*dy;
    const r = (dx*dx - dy*dy) / L;
    const s = (2*dx*dy) / L;

    // reflection about the line through `p1` with direction `[dx,dy]`
    const m = [
        [r,  s, ax - (r*ax + s*ay)],
        [s, -r, ay - (s*ax - r*ay)]
    ];

    return transform(ps, m);
}


export { flipAbout }
