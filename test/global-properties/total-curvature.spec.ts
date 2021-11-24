import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { gaussQuadrature } from 'flo-gauss-quadrature';
import { 
	evaluateDdxy, evaluateDxy, getInterfaceRotation, splitByMaxCurvature, tangent, 
	totalAbsoluteCurvature, totalCurvature, generateSelfIntersecting, fromToPrecise, toString
} from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../helpers/get-random-bezier.js';
import { rotate, translate } from 'flo-vector2d';
import { closeTo } from '../helpers/close-to.js';
import { radToDeg } from '../helpers/rad-to-deg.js';

use(nearly);

const abs = Math.abs;
const sqrt = Math.sqrt;
const 𝜋 = Math.PI;


function totalCurvatureByGauss(
		ps: number[][], 
		interval: number[]): number {

	if (ps.length === 1) { return 0; }

	const fromTo_ = fromToPrecise(ps);

	const ts = splitByMaxCurvature(ps, 1.1);

	let total = 0;
	for (let i=0; i<ts.length-1; i++) {
		const tS = ts[i];
		const tE = ts[i+1];

		const ps_ = fromTo_(tS,tE);
		total += gaussQuadrature(κds(ps_), interval, 64);
	}

	return total;
}


function κds(ps: number[][]) {
	return (t: number): number => {
		const [dx, dy] = evaluateDxy(ps, t); 
		const [ddx, ddy] = evaluateDdxy(ps, t);

		const a = dx*ddy - dy*ddx;
		const b = dx*dx + dy*dy;

		return a/b;
	}
}


function test(ps: number[][]) {
	// rotate and translate
	const sinθ = Math.sin(10);
	const cosθ = Math.cos(10);
	 ps = ps.map(p => translate([0.3,-0.1])(rotate(sinθ, cosθ)(p)));

	// calculate
	const c = totalCurvature(ps, [0,1]);
	const d = totalCurvatureByGauss(ps, [0,1]);
	radToDeg(c);
	radToDeg(d);

	const ulpsOrEps = 2**32;
	assert(
		closeTo([ulpsOrEps])(c - d, 0),
		`ps: ${toString(ps)}; Total curvatures don't match: calc deg: ${radToDeg(c)}, gauss deg: ${radToDeg(d)} - calc rad: ${c}, gauss rad: ${d}`
	);
}


function gaussCompare() {
	{
		const cubicWithAcnode = [[0,0], [0.8,0.2], [0.2,0.2], [1,0]];
		test(cubicWithAcnode);
	}

	{
		const selfIntersecting = [[-0.25,0.10],[0.73,-0.036],[0.44,-0.60],[-574,71]];
		test(selfIntersecting);
	}

	{
		const pss: number[][][] = [];

		pss.push(
			[[0,0], [100,0], [90,30], [50,-100]],
			[ 
				[-109.39121907516179, -80.01709704474013],
				[114.4912909833927, -80.87119017934222],
				[-33.456974424761015, -83.89310877488299],
				[-127.9450032710901, -69.024121628847]
			],
		);

		const ps = generateSelfIntersecting([0,0],[100,0],[50,50], [0.4,0.6]);
		pss.push(ps, ps.slice().reverse());

		for (const ps of pss) {
			test(ps);
		}
	}

	// test some random beziers
	const getRandomBezier_ = getRandomBezier(1, 53);

	for (let order=0; order<=3; order++) {
		const len = 25;
		const s = 0;
		for (let i=0; i<len; i++) {
			const ps = getRandomBezier_(order as 0|1|2|3)(i + (s*len));
			test(ps);
		}
	}

	{
		const len = 25;
		const s = 1;
		for (let i=2; i<len; i++) {
			const ps = getRandomBezier_(3)(i + (s*len));
			const ps1 = generateSelfIntersecting(
				ps[0],ps[1],ps[2], 
				[abs(ps[3][0]), abs(ps[3][1])]
			);
			const ps2 = generateSelfIntersecting(
				ps[0],ps[1],ps[2], 
				ps1[3].slice().reverse()
			);

			test(ps1);
			test(ps2);
		}
	}
}


function testBeziersInLoop(order: 1 | 2 | 3) {
	const getRandomBezier_ = getRandomBezier(128, 53)(order);

	const len = 3;
	const seedCount = 1;
	const seedSeed = 4;

	let totalTotalWinding = 0;

	// try with different seed values
	for (let s=seedSeed; s<seedSeed+seedCount; s++) {

		// get the loop
		const pss: number[][][] = [];
		let lastEnd: number[] | undefined = undefined;
		for (let i=0; i<len; i++) {
			const ps = getRandomBezier_(i+(s*len));
			// const ps = getRandomQuad(i+(s*len));
			if (lastEnd !== undefined) {
				ps[0] = lastEnd;
			}
			lastEnd = ps[ps.length-1];
			pss.push(ps);
		}
		const last = pss[pss.length-1];
		last[last.length-1] = pss[0][0];

		// test the loop
		let total = 0;
		for (let i=0; i<len; i++) {
			const j = (i-1+len)%len 
			const psI = pss[j];
			const psO = pss[i];
			const c = totalCurvature(psO, [0,1]);  //?
			const d = totalCurvatureByGauss(psO, [0,1]); //?

			c+d; //?
			(Math.PI - (c+d)) / (2*Math.PI) * 360 //?


			expect(c).to.be.nearly(2**48,d)

			// disconutinuous curvature (turn) at interface between 2 beziers
			const θ = getInterfaceRotation(
				tangent(psI, 1), 
				tangent(psO, 0)
			);

			total += c + θ;
		}

		const totalWinding = total / (2*𝜋);  //?
		totalTotalWinding += totalWinding;

		// TODO - put back
		// expect(totalWinding - Math.round(totalWinding)).to.be.nearly([2**10],0);
	}

	// totalTotalWinding
}


describe('totalCurvature', function() {
	it('it should calculate total curvature roughly equal to that calculated with Gauss Quadrature for some bezier curves',
	function() {
		gaussCompare();
	});

	it('it should calculate total curvature a multiple of 2𝜋 if some bezier curves form a closed loop',
	function() {
		// testBeziersInLoop(3);
	});

    it('it should calculate the correct total curvature for some bezier curves', 
	function() {
		/*
		{
			const ps = getRandomCubic(0);
			const c = totalCurvature(ps, [0,1]);
			expect(c).to.be.nearly(2**6, -2.368771502406411);
		}

		{
			const ps = getRandomQuad(0);
			const c = totalCurvature(ps, [0,1]);
			expect(c).to.be.nearly(2**6, -0.40711044270202335);
		}

		{
			const ps = getRandomCubic(2);
			const c = totalCurvature(ps, [0,1]);
			expect(c).to.be.nearly(2**6, -2.0675908473763984);
			const psr = ps.slice().reverse();
			const d = totalCurvature(psr, [0,1]);
			expect(d).to.be.nearly(2**6, 2.0675908473763984);
		}

		{
			const ps = getRandomLine(0);
			const c = totalCurvature(ps, [0,1]);
			expect(c).to.be.eql(0);
		}*/
	});
});


describe('totalAbsoluteCurvature', function() {
    it('it should calculate the correct total absolute curvature for some bezier curves', 
	function() {
		/*
		{
			const ps = getRandomCubic(0);
			const c = totalAbsoluteCurvature(ps, [0,1]);
			expect(c).to.be.nearly(2**6, 2.368771502406411);
		}

		{
			const ps = getRandomQuad(0);
			const c = totalAbsoluteCurvature(ps, [0,1]);
			expect(c).to.be.nearly(2**6, 0.40711044270202335);
		}

		{
			const ps = getRandomLine(0);
			const c = totalAbsoluteCurvature(ps, [0,1]);
			expect(c).to.be.eql(0);
		}
		*/
	});
});
