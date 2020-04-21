
import { multiply, allRoots } from 'flo-poly';
import { getDx } from "../to-power-basis/get-dx";
import { getDdx, getDdy } from "../index";
import { getDy } from "../to-power-basis/get-dy";
import { ds } from '../local-properties-at-t/ds';


/**
 * Find the maximum change in curve length (s) due to a change in the parameter 
 * (t)., i.e. max(ds/dt) for t ∈ [0,1]
 */
function maxDs(ps: number[][]) {
    // max(ds/dt) occurs at a point where d²s/dt² = 0, i.e. x'x'' + y'y'' = 0
    let dx = getDx(ps);
    let ddx = getDdx(ps);
    let dy = getDy(ps);
    let ddy = getDdy(ps);
    
    let x1x2 = multiply(dx, ddx);
    let y1y2 = multiply(dy, ddy);

    let f = multiply(x1x2, y1y2);

    let roots = allRoots(f, 0, 1);
    roots.push(0,1);

    let t = undefined;
    let max = Number.NEGATIVE_INFINITY;
    let evalDs = ds(ps);
    for (let root of roots) {
        let ds_ = evalDs(root);
        if (ds_ > max) {
            max = ds_;
            t = root;
        }
    }

    return { ds: max, t };
}


export { maxDs }
