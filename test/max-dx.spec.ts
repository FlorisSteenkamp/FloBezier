
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { getDxy, evalDeCasteljau, evaluateX, getDdxy, getDddxy } from '../src/index';
import { evaluate } from 'flo-poly';


// just for playing - not a real test

describe('max dx', function() {
	it('it should max dx',
	function() {
		//---- cubic
		{
			let ps = [[0,0],[0,0],[0,0],[0,0]];

			let maxD = Number.NEGATIVE_INFINITY;
			let maxPsD: number[][];
			let maxTD: number;
			let maxDd = Number.NEGATIVE_INFINITY;
			let maxPsDd: number[][];
			let maxTDd: number;
			let maxDdd = Number.NEGATIVE_INFINITY;
			let maxPsDdd: number[][];
			let maxTDdd: number;
			for (let i=0; i<100_000; i++) {
				ps = ps.map(p => p.map(c => 2*(Math.random() - 0.5)));
				let d = getDxy(ps);
				let dd = getDdxy(ps);
				let dddv = getDddxy(ps)[0];
				//let t = Math.random();
				let t = 1;
				let dv = evaluate(d[0], t);
				let ddv = evaluate(dd[0], t);
				//let dddv = evaluate(ddd, t);
				if (Math.abs(dv) > maxD) {
					maxD = Math.abs(dv); 
					maxPsD = ps;
					maxTD = t;
				}
				if (Math.abs(ddv) > maxDd) {
					maxDd = Math.abs(ddv); 
					maxPsDd = ps;
					maxTDd = t;
				}
				if (Math.abs(dddv) > maxDdd) {
					maxDdd = Math.abs(dddv); 
					maxPsDdd = ps;
					maxTDdd = t;
				}
			}

			console.log('cubic');
			console.log('max d', maxD);
			console.log('max dd', maxDd);
			console.log('max ddd', maxDdd);
			console.log('maxPsDdd', maxPsDdd);
			//console.log('max t', maxT);
		}

		//---- quadratic
		{
			let ps = [[0,0],[0,0],[0,0]];

			let maxD = Number.NEGATIVE_INFINITY;
			let maxPsD: number[][];
			let maxTD: number;
			let maxDd = Number.NEGATIVE_INFINITY;
			let maxPsDd: number[][];
			let maxTDd: number;
			for (let i=0; i<100_000; i++) {
				ps = ps.map(p => p.map(c => 2*(Math.random() - 0.5)));
				let d = getDxy(ps);
				let dd = getDdxy(ps);
				//let t = Math.random();
				let t = 1;
				let dv = evaluate(d[0], t);
				let ddv = evaluate(dd[0], t);
				if (Math.abs(dv) > maxD) {
					maxD = Math.abs(dv); 
					maxPsD = ps;
					maxTD = t;
				}
				if (Math.abs(ddv) > maxDd) {
					maxDd = Math.abs(ddv); 
					maxPsDd = ps;
					maxTDd = t;
				}
			}

			console.log('quadratic');
			console.log('max d', maxD);
			console.log('max dd', maxDd);
			//console.log('maxPs', maxPs);
			//console.log('max t', maxT);
		}

		//---- line
		{
			let ps = [[0,0],[0,0]];

			let max = Number.NEGATIVE_INFINITY;
			let maxPs: number[][];
			let maxT: number;
			for (let i=0; i<100_000; i++) {
				ps = ps.map(p => p.map(c => 2*(Math.random() - 0.5)));
				let d = getDxy(ps);
				//let t = Math.random();
				let t = 1;
				let v = evaluate(d[0], t);
				if (Math.abs(v) > max) {
					max = Math.abs(v); 
					maxPs = ps;
					maxT = t;
				}
			}

			console.log('line');
			console.log('max v', max);
			//console.log('maxPs', maxPs);
			//console.log('max t', maxT);
		}
	});
});
