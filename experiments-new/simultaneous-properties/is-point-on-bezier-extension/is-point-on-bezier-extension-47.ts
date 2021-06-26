import { isPointOnBezierExtension1_47 } from './is-point-on-bezier-extension-1-47';
import { isPointOnBezierExtension2_47 } from './is-point-on-bezier-extension-2-47';
import { isPointOnBezierExtension3_47 } from './is-point-on-bezier-extension-3-47';


/**
 * Returns `true` if the given point is on the given bezier curve where the 
 * parameter `t` is allowed to extend to ±∞, i.e. `t` is an element of 
 * `(-∞, +∞)`, `false` otherwise.
 * 
 * * **precondition**: `ps` and `p` must be bit-aligned with a maximum 
 * bitlength of 47.
 * 
 * @param ps 
 * @param p 
 */
function isPointOnBezierExtension_47(
        ps: number[][], p: number[]): boolean {

    if (ps.length === 4) {
        return isPointOnBezierExtension3_47(ps, p);
    }
    if (ps.length === 3) {
        return isPointOnBezierExtension2_47(ps, p);
    }

    return isPointOnBezierExtension1_47(ps, p);
}


export { isPointOnBezierExtension_47 }
