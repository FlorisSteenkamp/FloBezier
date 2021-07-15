import { draw } from './draw-stuff';
//import { settings } from '../settings'; 
import { cubicWithParamsAt0 } from '../../experiments-new/create/cubic-with-params-at-0/cubic-with-params-at-0';
import { drawCircle } from './draw/draw-circle';
import { drawCross1 } from './draw/draw-cross';
import { rotate90Degrees, toLength, toUnitVector, translate } from 'flo-vector2d';
import { settings } from './settings';
import { ctx } from './draw-stuff';
import { curvature, evaluate, tangent } from '../../src/index';

const { tc } = settings;
const abs = Math.abs;
const sqrt = Math.sqrt;

function testCubicWithParamsAt0() {
    const { dot_, box_, drawBezier_, } = draw(ctx);
    ctx.clearRect(0, 0, 2*640, 2*384);

    //const tan0 = [0.75,4.75];
    //const tan0 = [0.35,0.135];

    //const x0 = 0.25;
    //const y0 = 0.25;
    //const p0 = [x0,y0];
    //const tan0 = [0.75,0.375];
    //const k = -1;
    //const dk = -1.25;
    //const ddk = 3;
    //const dddk = 4;

    const x0 = 0.25;
    const y0 = 0.25;
    const p0 = [x0,y0];
    const tan0 = [0.75,0.375];
    const k = 1;
    const dk = -0.125;
    const ddk = -3;
    const dddk = 40;

    const ps = cubicWithParamsAt0(
        p0,   // [x0,y0]
        tan0, // tangent at [x0,y0]
        k,    // signed curvature at [x0,y0]
        dk,   // dk at [x0,y0]
        ddk,  // ddk at [x0,y0]
        dddk   // dddk at [x0,y0]
    );

    //--------------------------------
    // calc using forward differences
    //--------------------------------
    console.log('------');
    // delta 
    const Δt = 2**(-16);
    console.log('Δt', Δt);
    //const t = 0.125;  // some offset
    const t = 0;

    const pΔt0 = evaluate(ps,t + 0*Δt);
    const pΔt1 = evaluate(ps,t + 1*Δt);
    const pΔt2 = evaluate(ps,t + 2*Δt);
    const pΔt3 = evaluate(ps,t + 3*Δt);
    const pΔt4 = evaluate(ps,t + 4*Δt);

    const Δs01 = sqrt((pΔt1[0] - pΔt0[0])**2 + (pΔt1[1] - pΔt0[1])**2);
    const Δs12 = sqrt((pΔt2[0] - pΔt1[0])**2 + (pΔt2[1] - pΔt1[1])**2);
    const Δs23 = sqrt((pΔt3[0] - pΔt2[0])**2 + (pΔt3[1] - pΔt2[1])**2);
    const Δs34 = sqrt((pΔt4[0] - pΔt3[0])**2 + (pΔt4[1] - pΔt3[1])**2);

    console.log('Δs01', Δs01);
    console.log('Δs12', Δs12);
    console.log('Δs23', Δs23);
    console.log('Δs34', Δs34);

    const kΔ0 = curvature(ps,t + 0*Δt);
    const kΔ1 = curvature(ps,t + 1*Δt);
    const kΔ2 = curvature(ps,t + 2*Δt);
    const kΔ3 = curvature(ps,t + 3*Δt);
    const kΔ4 = curvature(ps,t + 4*Δt);

    console.log('kΔ0', k);
    //console.log('kΔ0', kΔ0);
    console.log('kΔ1', kΔ1);
    console.log('kΔ2', kΔ2);
    console.log('kΔ3', kΔ3);
    console.log('kΔ4', kΔ4);
    
    const Δk01 = (kΔ1 - k  ) / Δs01;
    //const Δk01 = (kΔ1 - kΔ0) / Δs01;
    const Δk12 = (kΔ2 - kΔ1) / Δs12;
    const Δk23 = (kΔ3 - kΔ2) / Δs23;
    const Δk34 = (kΔ4 - kΔ3) / Δs34;

    console.log('Δk01', Δk01);
    console.log('Δk12', Δk12);
    console.log('Δk23', Δk23);
    console.log('Δk34', Δk34);
    
    const ΔΔk12 = (Δk12 - Δk01) / Δs12;
    const ΔΔk23 = (Δk23 - Δk12) / Δs23;
    const ΔΔk34 = (Δk34 - Δk23) / Δs34;

    console.log('ΔΔk12',ΔΔk12)
    console.log('ΔΔk23',ΔΔk23)
    console.log('ΔΔk34',ΔΔk34)

    const ΔΔΔk23 = (ΔΔk23 - ΔΔk12) / Δs23;
    const ΔΔΔk34 = (ΔΔk34 - ΔΔk23) / Δs34;
    console.log('ΔΔΔk23',ΔΔΔk23)
    console.log('ΔΔΔk34',ΔΔΔk34)


    //console.log(curvature(ps,0.001))
    drawBezier_(ps.map(tc), true, true);

    drawC(ps, 0, k);
    drawC(ps, Δt);
    //drawC(ps, 0.001);
    //drawC(ps, 0.75);
    //drawC(ps, 1);

    //console.log(ps)
}

function drawC(ps: number[][], t: number, k = curvature(ps,t)) {
    //const k = curvature(ps,t)
    const p = evaluate(ps,t)
    const tan = tangent(ps,t);
    const v = translate(toLength(rotate90Degrees(tan), 1/k))(p);
    drawCircle(ctx, 2*384*(1/abs(k)), '#00f', undefined)(tc(v));
    drawCross1(ctx, '#0f0', undefined)(tc(p));

}


export { testCubicWithParamsAt0 }