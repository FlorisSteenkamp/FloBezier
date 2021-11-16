import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { getIntervalBox } from '../../../../src/index.js';
//import { getIntervalBox as getIntervalBoxOld } from '../../../../src/graveyard/bounds/get-interval-box/get-interval-box';
// @ts-ignore
import { performance } from 'perf_hooks';


const eps = Number.EPSILON;


describe('interval box', function() {
	/*
	it('speed test for cubic bezier curves 1',
	function() {
		// speed test
		let timeStart = performance.now();
		const r = Math.random;
		for (let i=0; i<1000_000; i++) {
			const ps = [[r(),r()],[r(),r()],[r(),r()],[r(),r()]]
			let ts = [r(),r()];
			if (ts[0] > ts[1]) { [ts[0], ts[1]] = [ts[1], ts[0]]; }
			
			const box = (getIntervalBox(ps, ts));
		}
		let timing = performance.now() - timeStart;
		console.log('milli-seconds: ' + timing.toFixed(3));		
	});
	*/
	/*
	it('speed test for cubic bezier curves 2',
	function() {
		// speed test
		let timeStart = performance.now();
		const r = Math.random;
		for (let i=0; i<1000_000; i++) {
			const ps = [[r(),r()],[r(),r()],[r(),r()],[r(),r()]]
			let ts = [r(),r()];
			if (ts[0] > ts[1]) { [ts[0], ts[1]] = [ts[1], ts[0]]; }
			
			const box = (getIntervalBoxOld(ps, ts));
		}
		let timing = performance.now() - timeStart;
		console.log('milli-seconds: ' + timing.toFixed(3) + ' (old)');
	});
	*/
	it('it should get a reasonable interval box for some lines', 
	function() {
		{
			let ps = [[3.3,-1.3],[2.3,-1.2]];

			let delta = eps * 2**1;
			let i = [1/3,1/3 + delta];
			let box = getIntervalBox(ps, i);
			console.log('interval box', box);
		}
	});

	it('it should get a reasonable interval box for some quadratic bezier curves', 
	function() {
		{
			let ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3]];

			let delta = eps * 2**1;
			let i = [1/3,1/3 + delta];
			let box = getIntervalBox(ps, i);
			console.log('interval box', box);
		}
	});

	it('it should get a reasonable interval box for some cubic bezier curves', 
	function() {
		{
			let ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3],[0.1,0.1]];
			//let ps = [[0,0],[1,1],[1,2],[3,2]];
			//let ps = [[3,-1],[2,-1],[1,1]];
			//let ps = [[0,0],[1,1],[1.54,2]];
			//let ps = [[3.33,-1.1221],[2.542234,-1]];
			//let ps = [[1.1111,1.2222],[1.54,2]];

			//let delta = eps * 2**40;  // === 0.000244140625
			let delta = eps * 2**1;

			let i = [1/3,1/3 + delta];
			
			let box = getIntervalBox(ps, i);
			
			console.log('interval box', box);
		}
	});
});
