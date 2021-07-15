//import { dkdtAt0 } from './dkdt-at-0';
//import { dsdtSquaredAt0 } from './dsdt-squared-at-0';
//import { ddtdssAt0 } from './ddtdss-at-0';
//import { dddkdsssAt0 } from './dddkdsss-at-0';
//import { kAt0 } from './k-at-0';
//import { dkdsAt0 } from './dkds-at-0';
import { psoSearch } from './pso-search';

const sqrt = Math.sqrt;



// you want expr to evalute to 0
//const expr = ([x1, x2, x3, x4, x5, x6]: Float64Array) => (Math.log2(x1) * x2 ** x3 / x4) + x5 ** (Math.log2(x6));
//const score = (xs: Float64Array) => {
//    const val = -(Math.abs(expr(xs)));
//    if (Object.is(NaN, val) || Object.is(Infinity, val)) {
//        return -Infinity
//    } else {
//        return val
//    }
//}

//const solutions = Array.from(psoSearch(score, 6));

//console.log(solutions);
let ii = 0;

function cubicWithParamsAt0(
        p0: number[],
        tan0: number[],
        k0: number,
        dk0: number,
        ddk0: number,
        dddk0: number): number[][] {

    //const x3 = 0.9375
    //const y3 = 0.525

    const score2_ = score2(p0, tan0, k0, dk0);

    //console.log(score([0.85,1]))
    //console.log(score([0.19,-0.01]))
    //console.log(score([
    //    0.7004209936503788,
    //    0.8286984078481552
    //]));
    //console.log(score([-0.2616628426158557, -0.4755674006506223]));

    
    //console.log(score([187.8745948397277, 82.94093059685588]));
    //throw 'b'

    //function score(x3: number, y3: number) {
    function score(particle: Float64Array | number[]) {
        const [x3, y3] = particle;
        const [_ddk0, _dddk0] = score2_(x3,y3) as number[];
        const r = (_ddk0 - ddk0)**2 + (_dddk0 - dddk0)**2;

        //if (ii > 100) console.log(r,x3,y3)
        //if (ii++ > 110) throw 'a';
        return -r;
    }

    

    const solutions = Array.from(psoSearch(score, 2));
    //console.log(solutions);

    let [x3,y3] = solutions[0];

    console.log('score', score([x3,y3]));

    let [,,[x0,y0],[x1,y1],[x2,y2]] = score2_(x3,y3) as number[][];
    
    //return [];
    return [[x0,y0],[x1,y1],[x2,y2],[x3,y3]];
}

/**
 * Returns a cubic bezier curve with the given initial conditions.
 * 
 * @param p0 the first control point
 * @param tan0 the tangent at `t === 0`
 * @param k0 the signed curvature at `t === 0`
 * @param dk0 the derivative (w.r.t the curve length `s`) of the signed 
 * curvature at `t === 0`
 * @param ddk0 the 2nd derivative (w.r.t the curve length `s`) of the signed 
 * curvature at `t === 0`
 * @param dddk0 the 3nd derivative (w.r.t the curve length `s`) of the signed 
 * curvature at `t === 0`
 */
function score2(
        p0: number[],
        tan0: number[],
        k0: number,
        dk0: number) {

    return (x3: number, y3: number): (number | number[])[] => {

        // Recall: a cubic bezier curve has 6 degrees of freedom.
        // k = (x′y′′ - y′x′′)/√(x′² + y′²)³  (signed curvature)

        const [x0,y0] = p0;
        const [tx,ty] = tan0;

        const x1 = tx/3 + x0;
        const y1 = ty/3 + y0;

        const xa = x1 - x0;
        const ya = y1 - y0;
        const xb = x0 - 2*x1;
        const yb = y0 - 2*y1;
        const xc = x0 - 3*x1;
        const yc = y0 - 3*y1;

        const xy = xa*xa + ya*ya;

        const sds = 27*sqrt(xy**3);

        const d = k0*sds/18/xa;

        const r1 = -4*xy**(-2.5);
        const cy3 = (2/3)*xa*xy**(-1.5);

        const ds_dt = 3*sqrt(xy);
        const dt_ds = 1/ds_dt;

        const c3 = 
            cy3*(-yc + 3*yb) + cy3*(ya/xa*xc - 3*ya/xa*xb) + 
            d*d*r1*xa*ya - 3*d*cy3 - dk0*ds_dt;


        //const x3 = 1.125;   // TODO
        //const y3 = 0.625;
        //const y3 = 0.25;

        //const x3 = 0.9375;
        //const y3 = 0.525;

        //const x3 = 3.5;
        //const y3 = 0.525;

        const f = -d*r1*xy;

        const cx2 = ya/xa;
        const cx3 = -cy3*ya/xa;

        const c2 = d - yb + (ya/xa)*xb;
        //-----------------------------------------------------
        // (1) the below implies: cx3*x3 + cy3*y3 + c3-g === 0 
        //-----------------------------------------------------
        const g = cx3*x3 + cy3*y3 + c3;

        //-----------------------------------------------------
        // (1) the below implies: g === (x2 + xb)/f
        //-----------------------------------------------------
        const x2 = g/f - xb;
        const y2 = cx2*x2 + c2;

        const xyn05 = xy**(-0.5);
        const xyn15 = xy**(-1.5);
        const xyn25 = xy**(-2.5);
        const xyn35 = xy**(-3.5);
        const xyn45 = xy**(-4.5);

        const ddk_dtt = (
            40*(xa*(xb + x2) + ya*(yb + y2))**2 * 
            (xa*(yb + y2) - ya*(xb + x2)) *
            xyn35
            + 
            xyn25 * (
                -8*(xa*(xb + x2) + ya*(yb + y2)) *
                (ya*(xc + 3*x2 - x3) - xa*(yc + 3*y2 - y3))
                + 
                4*(xa*(yb + y2) - ya*(xb + x2)) * 
                (xa*(xc + 3*x2 - x3) + ya*(yc + 3*y2 - y3) - 2*(xb + x2)**2 - 2*(yb + y2)**2)
                )
            + 
            (4/3) *
            ((yb + y2)*(xc + 3*x2 - x3) - (xb + x2)*(yc + 3*y2 - y3)) *
            xyn15
        );
        
        //const ddt_dss = -(2/9)*(xa*(xb + x2) + ya*(yb + y2)) * (xya)**(-2);
        const ddt_dss = -(2/9)*(xa*(xb + x2) + ya*(yb + y2)) * xy**(-2);

        const dk_dt = 
            -4*(xa*(xb + x2) + ya*(yb + y2)) * 
            (xa*(yb + y2) - ya*(xb + x2)) * 
            xyn25
            + 
            (2/3)*xyn15 * 
                (ya*(xc + 3*x2 - x3) -
                xa*(yc + 3*y2 - y3));


        //////////////////////
        const ddk_dss = (1/9)*(
            40*(xa*(xb + x2) + ya*(yb + y2))**2 * 
            (xa*(yb + y2) - ya*(xb + x2)) *
            xyn45
            + xyn35 * (
                -8*(xa*(xb + x2) + ya*(yb + y2)) *
                (ya*(xc + 3*x2 - x3) - xa*(yc + 3*y2 - y3))
                + 
                4*(xa*(yb + y2) - ya*(xb + x2)) * 
                (xa*(xc + 3*x2 - x3) + ya*(yc + 3*y2 - y3) - 2*(xb + x2)**2 - 2*(yb + y2)**2)
                )
            + 
            (4/3) *
            ((yb + y2)*(xc + 3*x2 - x3) - (xb + x2)*(yc + 3*y2 - y3)) *
            xyn25
            +
                -4*(
                -2*(xa*(xb + x2) + ya*(yb + y2)) * 
                (xa*(yb + y2) - ya*(xb + x2)) * 
                xyn45
                + 
                (1/3)*xyn35 * 
                    (ya*(xc + 3*x2 - x3) -
                    xa*(yc + 3*y2 - y3))
            ) * 
            (xa*(xb + x2) + ya*(yb + y2))
        );


        //const ddkdss = ddk_dtt*(1/(9*(xya))) + dk_dt*ddt_dss;

        
        // chain rule: https://www.quora.com/What-is-the-chain-rule-of-second-derivative
        
        const dddk_dttt = 12*(
            -(140/3)*(xa*(xb + x2) + ya*(yb + y2))**3 *
                    (xa*(yb + y2) - ya*(xb + x2)) * 
                    xy**(-4.5) 
            
            + 
            
            10*(xa*(xb + x2) + ya*(yb + y2))**2 *
            xy**(-3.5) * 
            (ya*(xc + 3*x2 - x3) - 
                xa*(yc + 3*y2 - y3)) 
            
            + 
            
            -10*(xa*(xb + x2) + ya*(yb + y2)) *
                (xa*(yb + y2) - ya*(xb + x2)) * 
                xy**(-3.5) * 
                (xa*(xc + 3*x2 - x3) + 
                ya*(yc + 3*y2 - y3) - 
                2*(xb + x2)*(xb + x2) - 
                2*(yb + y2)*(yb + y2))
            
            + 
            
            -2*(xa*(xb + x2) + ya*(yb + y2)) * 
            xy**(-2.5) * 
            ((yb + y2)*(xc + 3*x2 - x3) -
                (xb + x2)*(yc + 3*y2 - y3))
            
            + 
            
            2*(xa*(yb + y2) - ya*(xb + x2)) * 
            xy**(-2.5) * 
            ((xb + x2)*(xc + 3*x2 - x3) + 
            (yb + y2)*(yc + 3*y2 - y3))
            
            + 
            
            xy**(-2.5) * 
            ( xa*(xc + 3*x2 - x3) + ya*(yc + 3*y2 - y3) - 2*(xb + x2)*(xb + x2) - 2*(yb + y2)*(yb + y2)) * 
            (-xa*(yc + 3*y2 - y3) + ya*(xc + 3*x2 - x3)) 
        );


        const d__dt_ds__dt = -2/3*(xa*(xb + x2) + ya*(yb + y2)) * xyn15;
        const d__ddt_dss__dt = 
            16/9*(xa*(xb + x2) + ya*(yb + y2))**2 *
                xy**(-3) 
            + 
            2/9*xy**(-2) * 
                (xa*(xc + 3*x2 - x3) + 
                ya*(yc + 3*y2 - y3) + 
                -2*(xb + x2)*(xb + x2) + 
                -2*(yb + y2)*(yb + y2));

        
        //const dddk_dsss = (dddk_dttt*dt_ds**2 + ddk_dtt*(2*dt_ds*d__dt_ds__dt + ddt_dss) + dk_dt*d__ddt_dss__dt)*dt_ds;
        const dddk_dsss = 
            dddk_dttt*dt_ds**3 + 
            ddk_dtt*(2*dt_ds**2*d__dt_ds__dt + dt_ds*ddt_dss) + 
            dt_ds*dk_dt*d__ddt_dss__dt;


            

        /////////////////////////////////
        //const dk_ds = dk_dt/ds_dt;
        //console.log('-------');
        //const ps = [[x0,y0],[x1,y1],[x2,y2],[x3,y3]]
        //console.log('k', kAt0(ps))
        //console.log('dk/ds', dk_ds)
        //console.log('ddk/dss',ddk_dss);
        //console.log('dddk/dsss',dddk_dsss);  // -235.21011524279885


        const tol = Number.EPSILON*2**4;
        //if (Math.abs(dk_ds) < 0.125*(1 - tol) || Math.abs(dk_ds) > 0.125*(1 + tol)) { throw 'no!!!!!' }
        //if (Math.abs(ddk_dss) < 24.92382185176004*(1 - tol) || Math.abs(ddk_dss) > 24.92382185176004*(1 + tol)) { throw 'no!!!!!' }
        //if (Math.abs(dddk_dsss) < 235.21011524279882*(1 - tol) || Math.abs(dddk_dsss) > 235.21011524279882*(1 + tol)) { throw 'no!!!!!' }

        //return [[x0,y0],[x1,y1],[x2,y2],[x3,y3]];

        return [ddk_dss, dddk_dsss, [x0,y0],[x1,y1],[x2,y2]];
    }
}


export { cubicWithParamsAt0 }

// d³k/ds³
//   = d/dt(d²k/ds²) * dt/ds
//   = d/dt(d²k/dt² * (dt/ds)^2 + dk/dt(d²t/ds²))
//   = ([ d³k/dt³ * (dt/ds)^2 + d²k/dt² * (2*dt/ds * d/dt(dt/ds)) ] +
//      [ d²k/dt² * d²t/ds² + dk/dt * d/dt(d²t/ds²) ]) * dt/ds




