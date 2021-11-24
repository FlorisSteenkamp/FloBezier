import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { evaluateDdxy, evaluateDxy, getDxy, getDdxy, evalDeCasteljau } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { rotate, translate } from 'flo-vector2d';
import { Horner } from 'flo-poly';


const abs = Math.abs;
const sqrt = Math.sqrt;
const 𝜋 = Math.PI;

use(nearly);


function radToDeg(rad: number): number {
	return rad / (2*𝜋) * 360;
}


describe('curvature', function() {
	it('it should calculate curvature roughly equal to that calculated with Gauss Quadrature for some bezier curves',
	function() {
        // const getRandomBezier_ = getRandomBezier(128, 53)(order);

        // 0.005299532504175031,
        // 0.0277124884633837,
        // 0.06718439880608412,
        // 0.1222977958224985,
        // 0.19106187779867811,
        // 0.2709916111713863,
        // 0.35919822461037054,
        // 0.4524937450811813,
        // 0.5475062549188188,
        // 0.6408017753896295,
        // 0.7290083888286136,
        // 0.8089381222013219,
        // 0.8777022041775016,
        // 0.9328156011939159,
        // 0.9722875115366163,
        // 0.994700467495825

        // let ps = [[0,0], [100,0], [90,30], [50,-100]];
        let ps = [ 
            [-109.39121907516179, -80.01709704474013],
            [114.4912909833927, -80.87119017934222],
            [-33.456974424761015, -83.89310877488299],
            // [-127.9450032710901, -71.024121628847] 
            [-127.9450032710901, -69.024121628847]
        ];

        const t = 0.35919822461037054;
        const c = curvature(ps, t);

        evalDeCasteljau(ps, t); //?

        const sinθ = Math.sin(0);
        const cosθ = Math.cos(0);
        ps = ps.map(p => translate([0,0])(rotate(sinθ, cosθ)(p)));

        // const ulpsOrEps = 2**47;
        // assert(true, `msg`);
	});
});


function curvature(
        ps: number[][], 
        t: number): number {

    const [dX,dY] = getDxy(ps);
    const [ddX,ddY] = getDdxy(ps);

    const dx  = Horner(dX, t);
    const dy  = Horner(dY, t);
    const ddx = Horner(ddX, t);
    const ddy = Horner(ddY, t);

    t; //?
    dx; //?
    dy; //?
    ddx; //? 
    ddy; //? 

    dx*ddy; //?
    dy*ddx; //?
    
    const a = dx*ddy - dy*ddx;  //?
    const b = Math.sqrt((dx*dx + dy*dy)**3);

    return a / b;  //?
}
