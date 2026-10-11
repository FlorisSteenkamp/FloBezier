import { squaredDistanceBetween, translate, rotate } from "flo-vector2d";
import { getBoundingBox } from "./get-bounding-box.js";
import { controlPointLinesLength } from "../length/control-point-lines-length.js";
import { evalDeCasteljau } from "../../local-properties-at-t/evaluate/double/eval-de-casteljau.js";

const { sqrt } = Math;


/**
 * Returns a **non-certified**, **rotated**, **tight** bounding box of the given 
 * bezier curve as four ordered points of a rotated rectangle (with each given 
 * as `[x,y]`)
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
function getBoundingBoxTight(ps: number[][]): number[][] {
    const [xS, yS] = ps[0];
    const [xE, yE] = ps[ps.length-1];
    
    let dx: number;
    let dy: number;

    // take care of the case the endpoints are close together
    const len = controlPointLinesLength(ps);
    if (squaredDistanceBetween(ps[0], ps[ps.length-1]) * 2**8 < len*len) { 
        const [xE_, yE_] = evalDeCasteljau(ps, 0.5);
        dx = xE_ - xS;
        dy = yE_ - yS;
    } else {
        dx = xE - xS;
        dy = yE - yS;
    }

    let sinθ: number;
    let cosθ: number;

    const hypotenuse = sqrt(dx*dx + dy*dy);
    if (hypotenuse === 0) {
        // degenerate case, e.g. all control points coincide (or the curve 
        // returns to its start point at `t === 0.5`) - there is no direction
        // to rotate to so just use an axis-aligned box
        sinθ = 0;
        cosθ = 1;
    } else {
        sinθ = dy / hypotenuse;
        cosθ = dx / hypotenuse;
    }
    
    const box = getNormalizedBoundingBox(ps, sinθ, cosθ);
    
    const [[p0x,p0y],[p1x,p1y]] = box;

    const axisAlignedBox = [ 
        box[0], [p1x, p0y],
        box[1], [p0x, p1y]
    ];

    const rotate_ = rotate(sinθ, cosθ);
    return axisAlignedBox.map(p => translate(ps[0], rotate_(p)));
}


/**
 * Helper function. Returns the bounding box of the normalized (i.e. first point 
 * moved to origin and rotated so that last point lies on x-axis) given cubic 
 * bezier.
 * 
 * * returns the bounding box in the form [[minX, minY], [maxX,maxY]
 * 
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param sinθ - Sine of angle made by line from first bezier point to 
 * last with x-axis.
 * @param cosθ - Cosine of angle made by line from first bezier point 
 * to last with x-axis.
 * 
 * @internal
 */
function getNormalizedBoundingBox(
        ps: number[][], sinθ: number, cosθ: number): number[][] {

    const vectorToOrigin = ps[0].map(x => -x);
    
    const f = translate(vectorToOrigin);
    const boundingPs = ps.map(p => rotate(-sinθ, cosθ, f(p)));
    
    return getBoundingBox(boundingPs);
}


export { getBoundingBoxTight }
