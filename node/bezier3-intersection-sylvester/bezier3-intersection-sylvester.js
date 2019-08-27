"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PRECONDITION: Control points have max 13-bit significand aligned to grid
 * accuracy.
 *
 * Returns the intersection points between two cubic beziers.
 *
 * Note: Determinant calculated using https://www.dcode.fr/matrix-determinant
 *
 * See: http://mat.polsl.pl/sjpam/zeszyty/z6/Silesian_J_Pure_Appl_Math_v6_i1_str_155-176.pdf
 *
 * @param ps1 - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 - Another cubic bezier
 * See http://mat.polsl.pl/sjpam/zeszyty/z6/Silesian_J_Pure_Appl_Math_v6_i1_str_155-176.pdf
 */
function bezier3IntersectionSylvester(ps1, ps2) {
    /*
    if (typeof _DEBUG_ !== 'undefined') {
        Check preconditions
    }
    */
    // The c_2x here can use an extra 4 bits due to the 6* part in getX / getY
    // to go from 13 to 17 bits so we can multiply 3 times to go to 3*17 or
    // 51 < 53 bits.
    /*let [c_3x, c_2x, c_1x, c_0x] = getX(ps1);
    let [c_3y, c_2y, c_1y, c_0y] = getY(ps1);
    let [d_3x, d_2x, d_1x, d_0x] = getX(ps2);
    let [d_3y, d_2y, d_1y, d_0y] = getY(ps2);
    
    let [a,b,c,d,e,f] = [d_3x, c_3x, d_2x, c_2x, d_1x, c_1x];
    let Δx = d_0x - c_0x;
    let [m,n,p,q,r,s] = [d_3y, c_3y, d_2y, c_2y, d_1y, c_1y];
    let Δy = d_0y - c_0y;

    //let a_,b_,c_,d_, e_,f_,g_,h_;

    let a_ = a -
    
    // All the below is now at max 2*17 = 34 bits
    let a2 = a*a;
    let b2 = b*b;
    let c2 = c*c;
    let d2 = d*d;
    let e2 = e*e;
    let f2 = f*f;
    let m2 = m*m;
    let n2 = n*n;
    let p2 = p*p;
    let q2 = q*q;
    let r2 = r*r;
    let s2 = s*s;
    let Δy2 = Δy*Δy;
    
    // All the below is now at max 3*17 = 51 bits
    let a3 = a2*a;
    let b3 = b2*b;
    let c3 = c2*c;
    let d3 = d2*d;
    let e3 = e2*e;
    let f3 = f2*f;
    let Δy3 = Δy2*Δy;
    
    // All the below is now at max 3*17 = 51 bits
    let dΔy   = d*Δy;
    let dΔy2  = d*Δy2;
    let bdΔy  = b*dΔy;
    let bdΔy2 = b*dΔy2;
    let cΔy   = c*Δy;
    let cΔy2  = c*Δy2;
    let bΔy  = b*Δy;
    let bΔy2  = b*Δy2;
    let bΔy3  = b*Δy3;
    
    let k9 = -b2*Δy*f*s2 + bdΔy*f*q*s + 2*bΔy*f2*n*s-d2*Δy*f*n*s -
             b2*dΔy2*s - bΔy*f2*q2 + dΔy*f2*n*q - 2*b2*Δy2*f*q +
             d2*bΔy2*q - Δy*f3*n2 + 3*bdΔy2*f*n - d3*Δy2*n - b3*Δy3;
    
    let k8 = b2*Δy*e*s2 + 2*b2*Δy*f*r*s - bdΔy*e*q*s - 4*bΔy*e*f*n*s +
             d2*Δy*e*n*s - bdΔy*f*q*r - 2*bΔy*f2*n*r + d2*Δy*f*n*r +
             b2*dΔy2*r + 2*bΔy*e*f*q2 - 2*dΔy*e*f*n*q + 2*b2*Δy2*e*q +
             3*Δy*e*f2*n2 - 3*bdΔy2*e*n;
    
    let k7 = -2*b2*Δy*e*r*s - b*cΔy*f*q*s - bdΔy*f*p*s + 2*c*dΔy*f*n*s +
             2*bΔy*e2*n*s + b2*cΔy2*s - b2*Δy*f*r2 + bdΔy*e*q*r +
             4*bΔy*e*f*n*r - d2*Δy*e*n*r - bΔy*e2*q2 + 2*bΔy*f2*p*q -
             cΔy*f2*n*q + dΔy*e2*n*q - 2*b*c*dΔy2*q - dΔy*f2*n*p +
             2*b2*Δy2*f*p - b*d2*Δy2*p - 3*Δy*e2*f*n2 - 3*b*cΔy2*f*n +
             3*c*d2*Δy2*n;
    
    let k6 = 2*a*bΔy*f*s2 - a*dΔy*f*q*s + b*cΔy*e*q*s + bdΔy*e*p*s -
             2*a*Δy*f2*n*s - 2*c*dΔy*e*n*s - 2*bΔy*f2*m*s + d2*Δy*f*m*s +
             2*a*bdΔy2*s + b2*Δy*e*r2 + b*cΔy*f*q*r + bdΔy*f*p*r -
             2*c*dΔy*f*n*r - 2*bΔy*e2*n*r - b2*cΔy2*r + a*Δy*f2*q2 -
             4*bΔy*e*f*p*q + 2*cΔy*e*f*n*q - dΔy*f2*m*q + 4*a*bΔy2*f*q -
             a*d2*Δy2*q + 2*dΔy*e*f*n*p - 2*b2*Δy2*e*p + Δy*e3*n2 +
             2*Δy*f3*m*n - 3*a*dΔy2*f*n + 3*b*cΔy2*e*n - 3*bdΔy2*f*m +
             d3*Δy2*m + 3*a*b2*Δy3;
    
    let k5 = -2*a*bΔy*e*s2 - 4*a*bΔy*f*r*s + a*dΔy*e*q*s + b*cΔy*f*p*s +
             4*a*Δy*e*f*n*s - c2*Δy*f*n*s + 4*bΔy*e*f*m*s - d2*Δy*e*m*s +
             a*dΔy*f*q*r - b*cΔy*e*q*r - bdΔy*e*p*r + 2*a*Δy*f2*n*r +
             2*c*dΔy*e*n*r + 2*bΔy*f2*m*r - d2*Δy*f*m*r - 2*a*bdΔy2*r -
             2*a*Δy*e*f*q2 + 2*bΔy*e2*p*q - cΔy*e2*n*q + 2*dΔy*e*f*m*q -
             4*a*bΔy2*e*q + b*c2*Δy2*q - bΔy*f2*p2 + cΔy*f2*n*p -
             dΔy*e2*n*p + 2*b*c*dΔy2*p - 6*Δy*e*f2*m*n + 3*a*dΔy2*e*n -
             3*c2*dΔy2*n + 3*bdΔy2*e*m;
    
    let k4 = 4*a*bΔy*e*r*s + a*cΔy*f*q*s + a*dΔy*f*p*s - b*cΔy*e*p*s -
             2*a*Δy*e2*n*s + c2*Δy*e*n*s - 2*c*dΔy*f*m*s - 2*bΔy*e2*m*s -
             2*a*b*cΔy2*s + 2*a*bΔy*f*r2 - a*dΔy*e*q*r - b*cΔy*f*p*r -
             4*a*Δy*e*f*n*r + c2*Δy*f*n*r - 4*bΔy*e*f*m*r + d2*Δy*e*m*r +
             a*Δy*e2*q2 - 2*a*Δy*f2*p*q + cΔy*f2*m*q - dΔy*e2*m*q +
             2*a*c*dΔy2*q + 2*bΔy*e*f*p2 - 2*cΔy*e*f*n*p + dΔy*f2*m*p -
             4*a*bΔy2*f*p + a*d2*Δy2*p + 6*Δy*e2*f*m*n + 3*a*cΔy2*f*n +
             3*b*cΔy2*f*m - 3*c*d2*Δy2*m;
    
    let k3 = -a2*Δy*f*s2 - a*cΔy*e*q*s - a*dΔy*e*p*s + 2*a*Δy*f2*m*s +
             2*c*dΔy*e*m*s - a2*dΔy2*s - 2*a*bΔy*e*r2 - a*cΔy*f*q*r -
             a*dΔy*f*p*r + b*cΔy*e*p*r + 2*a*Δy*e2*n*r - c2*Δy*e*n*r +
             2*c*dΔy*f*m*r + 2*bΔy*e2*m*r + 2*a*b*cΔy2*r +
             4*a*Δy*e*f*p*q - 2*cΔy*e*f*m*q - 2*a2*Δy2*f*q - bΔy*e2*p2 +
             cΔy*e2*n*p - 2*dΔy*e*f*m*p + 4*a*bΔy2*e*p - b*c2*Δy2*p -
             2*Δy*e3*m*n - 3*a*cΔy2*e*n + c3*Δy2*n - Δy*f3*m2 +
             3*a*dΔy2*f*m - 3*b*cΔy2*e*m - 3*a2*bΔy3;
    
    let k2 = a2*Δy*e*s2 + 2*a2*Δy*f*r*s - a*cΔy*f*p*s - 4*a*Δy*e*f*m*s +
             c2*Δy*f*m*s + a*cΔy*e*q*r + a*dΔy*e*p*r - 2*a*Δy*f2*m*r -
             2*c*dΔy*e*m*r + a2*dΔy2*r - 2*a*Δy*e2*p*q + cΔy*e2*m*q +
             2*a2*Δy2*e*q - a*c2*Δy2*q + a*Δy*f2*p2 - cΔy*f2*m*p +
             dΔy*e2*m*p - 2*a*c*dΔy2*p + 3*Δy*e*f2*m2 - 3*a*dΔy2*e*m +
             3*c2*dΔy2*m;
    
    let k1 = -2*a2*Δy*e*r*s + a*cΔy*e*p*s + 2*a*Δy*e2*m*s - c2*Δy*e*m*s +
             a2*cΔy2*s - a2*Δy*f*r2 + a*cΔy*f*p*r + 4*a*Δy*e*f*m*r -
             c2*Δy*f*m*r - 2*a*Δy*e*f*p2 + 2*cΔy*e*f*m*p + 2*a2*Δy2*f*p -
             3*Δy*e2*f*m2 - 3*a*cΔy2*f*m;
    
    let k0 = a2*Δy*e*r2 - a*cΔy*e*p*r - 2*a*Δy*e2*m*r + c2*Δy*e*m*r -
             a2*cΔy2*r + a*Δy*e2*p2 - cΔy*e2*m*p - 2*a2*Δy2*e*p +
             a*c2*Δy2*p + Δy*e3*m2 + 3*a*cΔy2*e*m - c3*Δy2*m + a3*Δy3;
    
    
    let poly = [k9,k8,k7,k6,k5,k4,k3,k2,k1,k0];
    
    let roots = allRoots(poly, 0);

    let tPairs = [];
    
    for (let i=0; i<roots.length; i++) {
        let k = roots[i];
        let k2 = k*k;
        let k3 = k2*k;
        
        let ps1k = {
                x: [c_3x*k3, c_2x*k2, c_1x*k, c_0x],
                y: [c_3y*k3, c_2y*k2, c_1y*k, c_0y]
        };
        let ps2k = {
                x: [d_3x*k3, d_2x*k2, d_1x*k, d_0x],
                y: [d_3y*k3, d_2y*k2, d_1y*k, d_0y]
        }
        
        let xx = subtract(getX(rotatedPs2), ps1k.x);
        let yy = subtract(getY(rotatedPs2), ps1k.y);
        
        let rootsx = allRoots(xx,0,1);
        let rootsy = allRoots(yy,0,1);
        
        for (let j=0; j<rootsx.length; j++) {
            let rootx = rootsx[j];
            for (let l=0; l<rootsy.length; l++) {
                let rooty = rootsy[l];
                if (Math.abs(rootx - rooty) < DELTA) {
                    let t = (rootx+rooty)/2;
                    let tk = t*k;
                    if (t >= 0 && t <= 1 && tk >= 0 && tk <= 1) {
                        tPairs.push([tk, t]);
                    }
                }
            }
        }
    }
    
    return tPairs;
    */
}
exports.bezier3IntersectionSylvester = bezier3IntersectionSylvester;
//# sourceMappingURL=bezier3-intersection-sylvester.js.map