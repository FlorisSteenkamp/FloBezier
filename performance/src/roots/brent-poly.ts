const eps = Number.EPSILON;
const u = eps/2;
const abs = Math.abs;
const max = Math.max;


function brentPoly(
        p: number[], 
        lb: number, 
        ub: number,
        fa: number,
        fb: number): number {

    // Precondition: fa, fb !== 0

    //---- Make local copies of a and b.
    let a = lb;
    let b = ub;

    let c = a;
    let fc = fa;
    let e = b - a;
    let d = e;

    const δ = 8 * u;

    while (true) {
        if (abs(fc) < abs(fb)) {
            a = b; b = c; c = a;
            fa = fb; fb = fc; fc = fa;
        }

        //const δ = 2 * u * max(1,abs(a),abs(b));

        const m = 0.5*(c - b);

        //if (abs(m) <= δ || fb === 0) {
        if (abs(m) <= δ) {
            // uncomment below if range to be returned
            //return b < c ? [b,c] : [c,b];

            // uncomment below if leftmost guess to be returned
            //return b < c ? b : c;

            // uncomment below if rightmost guess to be returned
            //return b < c ? b : c;

            // uncomment below if any guess to be returned
            return b;
        }

        if (abs(e) < δ || abs(fa) <= abs(fb)) {
            e = m;
            d = e;
        } else {
            let s = fb / fa;
            let p: number;
            let q: number;
            if (a === c) {
                p = 2*m*s;
                q = 1 - s;
            } else {
                q = fa / fc;
                const r = fb / fc;
                p = s*(2*m*q*(q - r) - (b - a)*(r - 1));
                q = (q - 1)*(r - 1)*(s - 1);
            }

            if (0 < p) { q = -q; } else { p = -p; }

            s = e;
            e = d;

            if (2*p < 3*m*q - abs(δ*q) && p < abs(0.5*s*q)) {
                d = p / q;
            } else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;

        if (δ < abs(d)) {
            b = b + d;
        } else if (0 < m) {
            b = b + δ;
        } else {
            //b = b - eps;
            b = b - δ;
        }

        //fb = Horner(p,b);
        // inlined above line:
        fb = p[0]; for (let i=1; i<p.length; i++) { fb = fb*b + p[i]; }

        if (fb === 0) {
            return b;
        }

        if (fb*fc > 0) {
            c = a;
            fc = fa;
            e = b - a;
            d = e;
        }
    }
}


export { brentPoly }
