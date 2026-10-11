const { abs, min, max } = Math;
const { EPSILON: eps, MIN_VALUE: minValue } = Number;


// The 15-point Gauss-Kronrod rule (G7K15) nodes and weights as used by
// QUADPACK's `qk15` (see https://www.netlib.org/quadpack/).

/**
 * The positive abscissae of the 15-point Kronrod rule (the last one being 0,
 * i.e. the center) - the ones at odd indices (and the center) are also the
 * abscissae of the 7-point Gauss rule.
 *
 * @internal
 */
const xgk = [
    0.991455371120812639206854697526329,
    0.949107912342758524526189684047851,
    0.864864423359769072789712788640926,
    0.741531185599394439863864773280788,
    0.586087235467691130294144838258730,
    0.405845151377397166906606412076961,
    0.207784955007898467600689403773245,
    0.000000000000000000000000000000000
];

/**
 * The weights of the 15-point Kronrod rule (corresponding to `xgk`).
 *
 * @internal
 */
const wgk = [
    0.022935322010529224963732008058970,
    0.063092092629978553290700663189204,
    0.104790010322250183839876322541518,
    0.140653259715525918745189590510238,
    0.169004726639267902826583426598550,
    0.190350578064785409913256402421014,
    0.204432940075298892414161999234649,
    0.209482141084727828012999174891714
];

/**
 * The weights of the 7-point Gauss rule (corresponding to `xgk[1]`, `xgk[3]`,
 * `xgk[5]` and `xgk[7]`, i.e. the center).
 *
 * @internal
 */
const wg = [
    0.129484966168869693270611432679082,
    0.279705391489276667901467771423780,
    0.381830050505118944950369775488975,
    0.417959183673469387755102040816327
];


/**
 * Numerically integrates the given function over the given interval using
 * the 15-point Gauss-Kronrod rule (G7K15) and additionally returns an
 * estimate of the absolute error (which is typically a conservative
 * over-estimate).
 *
 * * the error estimate is calculated exactly as in QUADPACK's `qk15`
 * * the 7-point Gauss rule is exact for polynomials up to degree 13 and the
 * 15-point Kronrod rule for polynomials up to degree 22
 *
 * @param f the function to integrate
 * @param a the lower integration limit
 * @param b the upper integration limit
 *
 * @internal
 */
function gaussKronrod15(
        f: (t: number) => number,
        a: number,
        b: number): { value: number; error: number } {

    const c = (a + b)/2;
    const h = (b - a)/2;

    const fc = f(c);
    let resg = fc*wg[3];   // the 7-point Gauss result
    let resk = fc*wgk[7];  // the 15-point Kronrod result
    let resabs = abs(resk);
    const fv1: number[] = [];
    const fv2: number[] = [];
    for (let j=0; j<7; j++) {
        const dx = h*xgk[j];
        const f1 = f(c - dx);
        const f2 = f(c + dx);
        fv1.push(f1);
        fv2.push(f2);
        const fsum = f1 + f2;
        resk += wgk[j]*fsum;
        resabs += wgk[j]*(abs(f1) + abs(f2));
        if (j % 2 === 1) {
            resg += wg[(j - 1)/2]*fsum;
        }
    }

    // `resasc` is an estimate of the integral of `|f - mean(f)|`
    const reskh = resk/2;
    let resasc = wgk[7]*abs(fc - reskh);
    for (let j=0; j<7; j++) {
        resasc += wgk[j]*(abs(fv1[j] - reskh) + abs(fv2[j] - reskh));
    }

    const value = resk*h;
    resabs *= abs(h);
    resasc *= abs(h);

    let error = abs((resk - resg)*h);
    if (resasc !== 0 && error !== 0) {
        error = resasc*min(1, (200*error/resasc)**1.5);
    }
    if (resabs > minValue/(50*eps)) {
        error = max(50*eps*resabs, error);
    }

    return { value, error };
}


export { gaussKronrod15 }
