"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCuspAtHalf3 = void 0;
/**
 * Returns the cubic bezier curve control points with a zero tangent vector
 * (i.e. `[0,0]`) at `t = 0.5` (i.e. a 'cusp') at the given [[Point]] with
 * given starting and ending control [Point]s.
 * * **non-exact** - due to floating-point round-off the cusp is not necessarily
 * *exactly* at the given point, nor does the tangent vector necessarily vanish
 * *exactly*.
 *
 * @param p0 the bezier start point
 * @param pz the point at which the vanishing tangent should occur
 * @param pE the bezier end point
 *
 * @doc mdx
 */
function generateCuspAtHalf3(p0, pz, pE) {
    // x3 - 3x2 + 3x1 - x0, // := a = coefficent of t^3
    // 3x2 - 6x1 + 3x0,     // := b = coefficent of t^2
    // 3x1 - 3x0,           // := c = coefficent of t^1
    // x0,                  // := d = coefficent of t^0
    // y3 - 3y2 + 3y1 - y0, // := e = coefficent of t^3
    // 3y2 - 6y1 + 3y0,     // := f = coefficent of t^2
    // 3y1 - 3y0,           // := g = coefficent of t^1
    // y0,                  // := h = coefficent of t^0
    // let x = at^3 + bt^2 + ct + d
    // let y = et^3 + ft^2 + gt + h
    // x` = 3at^2 + 2bt + c
    // y` = 3et^2 + 2ft + g
    // d = x0 and h = y0
    let [x0, y0] = p0;
    let [xz, yz] = pz;
    let [xE, yE] = pE;
    // We must have x` = y` = 0 at t = 1/2:
    // 3a/4 + b + c = 0            =>  3a  + 4b  + 4c  =  0       (1)
    // 3e/4 + f + g = 0            =>  3e  + 4f  + 4g  =  0       (2)
    // Also, x(1/2) === pz[0]:
    // a/8 + b/4 + c/2 + d = pz[0] => a + 2b + 4c + 8d = 8xz      (3)
    // and y(1/2) === pz[1]:
    // e/8 + f/4 + g/2 + h = pz[1] => e + 2f + 4g + 8h = 8yz      (4)
    // and by definitition:
    // a = x3 - 3x2 + 3x1 - x0     => -3x2 + 3x1 - a   =  x0 - x3 (5)
    // b = 3x2 - 6x1 + 3x0         =>  3x2 - 6x1 - b   = -3x0     (6)
    // c = 3x1 - 3x0               =>  3x1       - c   =  3x0     (7)
    // e = y3 - 3y2 + 3y1 - y0     => -3y2 + 3y1 - e   =  y0 - y3 (8)
    // f = 3y2 - 6y1 + 3y0         =>  3y2 - 6y1 - f   = -3y0     (9) 
    // g = 3y1 - 3y0               =>  3y1       - g   =  3y0     (10)
    // Solving the above linear system gives:
    //let a = 4*xE-4*x0;
    //let b = 4*x0-4*xz-4*xE+4*x0;
    //let c = -4*x0+4*xz+xE-x0;
    //let e = 4*yE-4*y0;
    //let f = 4*y0-4*yz-4*yE+4*y0;
    //let g = -4*y0+4*yz+yE-y0;
    let x1 = -(4 * x0 - 4 * xz - xE - 2 * x0) / 3;
    let y1 = -(4 * y0 - 4 * yz - yE - 2 * y0) / 3;
    let x2 = -(4 * x0 - 4 * xz + 2 * xE - 5 * x0) / 3;
    let y2 = -(4 * y0 - 4 * yz + 2 * yE - 5 * y0) / 3;
    return [p0, [x1, y1], [x2, y2], pE];
}
exports.generateCuspAtHalf3 = generateCuspAtHalf3;
/*
3*a  + 4*b  + 4*c   = 0
3*e  + 4*f  + 4*g   = 0
a + 2*b + 4*c + 8*d = 8*xz
e + 2*f + 4*g + 8*h = 8*yz
-3*x2 + 3*x1 - a =  x0 - x3
3*x2 - 6*x1 - b = -3*x0
3*x1 - c = 3*x0
-3*y2 + 3*y1 - e = y0 - y3
3*y2 - 6*y1  - f = -3*y0
3*y1 - g = 3*y0
*/
//# sourceMappingURL=generate-cusp-at-half-t.js.map