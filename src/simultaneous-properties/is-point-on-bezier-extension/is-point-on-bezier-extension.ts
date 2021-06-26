import { isPointOnBezierExtension1 } from './is-point-on-bezier-extension-1';
import { isPointOnBezierExtension2 } from './is-point-on-bezier-extension-2';
import { isPointOnBezierExtension3 } from './is-point-on-bezier-extension-3';


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
function isPointOnBezierExtension(
        ps: number[][], p: number[]): boolean {

    if (ps.length === 4) {
        return isPointOnBezierExtension3(ps, p);
    }
    if (ps.length === 3) {
        return isPointOnBezierExtension2(ps, p);
    }

    return isPointOnBezierExtension1(ps, p);
}


export { isPointOnBezierExtension }
