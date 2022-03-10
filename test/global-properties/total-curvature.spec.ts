import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { gaussQuadrature } from 'flo-gauss-quadrature';
import { 
	evaluateDdxy, evaluateDxy, getInterfaceRotation, splitByCurvature, tangent, 
	totalAbsoluteCurvature, totalCurvature, generateSelfIntersecting, fromTo, toString, generateCuspAtHalf3
} from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { closeTo } from '../helpers/close-to.js';
import { radToDeg } from '../helpers/rad-to-deg.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';


use(nearly);

const abs = Math.abs;
const sqrt = Math.sqrt;
const 𝜋 = Math.PI;


function totalCurvatureByGauss(
		ps: number[][], 
		interval: number[],
		flatness: number,
		gaussOrder: number): number {

	if (ps.length === 1) { return 0; }

	const ts = splitByCurvature(ps, flatness);

	let total = 0;
	for (let i=0; i<ts.length-1; i++) {
		const tS = ts[i];
		const tE = ts[i+1];

		const ps_ = fromTo(ps,tS,tE).ps;
		total += gaussQuadrature(κds(ps_), interval, gaussOrder as 4|16|64);
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
	{
		const c = totalCurvature(ps, [0,1]);
		const d = totalCurvatureByGauss(ps, [0,1], 1.01, 64);
		// radToDeg(c);
		// radToDeg(d);

		const ulpsOrEps = 2**32;
		assert(
			closeTo([ulpsOrEps])(c - d, 0),
			// `ps: ${toString(ps)}; Total curvatures don't match: calc deg: ${radToDeg(c)}, gauss deg: ${radToDeg(d)} - calc rad: ${c}, gauss rad: ${d}`
			`Total curvatures don't match: calc deg: ${radToDeg(c)}, gauss deg: ${radToDeg(d)} - calc rad: ${c}, gauss rad: ${d}`
		);
	}

	{
		// rotate and translate (to test invariance)
		ps = randomRotateAndTranslate(0)(ps);

		const c = totalCurvature(ps, [0,1]);
		const d = totalCurvatureByGauss(ps, [0,1], 1.01, 64);
		// radToDeg(c);
		// radToDeg(d);

		const ulpsOrEps = 2**34;
		assert(
			closeTo([ulpsOrEps])(c - d, 0),
			// `ps: ${toString(ps)}; Total curvatures don't match: calc deg: ${radToDeg(c)}, gauss deg: ${radToDeg(d)} - calc rad: ${c}, gauss rad: ${d}`
			`Total curvatures don't match: calc deg: ${radToDeg(c)}, gauss deg: ${radToDeg(d)} - calc rad: ${c}, gauss rad: ${d}`
		);
	}
}


function gaussCompare() {
	{
		const cubicWithAcnode = [[0,0], [0.8,0.2], [0.2,0.2], [1,0]];
		test(cubicWithAcnode);
	}

	{
		// crunode
		const selfIntersecting = [[-0.25,0.10],[0.73,-0.036],[0.44,-0.60],[-574,71]];
		test(selfIntersecting);
	}

	{
		const cusp = generateCuspAtHalf3([0,0], [6,2], [3,0]);
		// cusp === [[0,0], [9,2.6666666666666665], [6,2.6666666666666665], [3,0]];
		// We cannot test using Gauss Quadrature since the cusp will always be missed
		//test(cusp.slice().reverse());
		//test(cusp);
		expect(totalCurvature(cusp.slice().reverse())).to.be.nearly(2**4, 2.7030057599586934);
		expect(totalCurvature(cusp)).to.be.nearly(2**4, -2.7030057599586934);
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

	const len = 5;
	const seedCount = 3;
	const seedSeed = 0;

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
			const c = totalCurvature(psO, [0,1]);
			const d = totalCurvatureByGauss(psO, [0,1], 1.01, 64);

			// (Math.PI - (c+d)) / (2*Math.PI) * 360;

			expect(c).to.be.nearly(2**32,d)

			// disconutinuous curvature (turn) at interface between 2 beziers
			const θ = getInterfaceRotation(
				tangent(psI, 1), 
				tangent(psO, 0)
			);

			total += c + θ;
		}

		const totalWinding = total / (2*𝜋);

		expect(totalWinding - Math.round(totalWinding)).to.be.nearly([2**8],0);
	}
}


function testSomeTotalCurvature() {
	{
		const ps = getRandomCubic(0);
		const c = totalCurvature(ps, [0,1]);
		expect(c).to.be.nearly(2**6, -0.9134823236058587);
	}

	{
		const ps = getRandomQuad(0);
		const c = totalCurvature(ps, [0,1]);
		expect(c).to.be.nearly(2**6, 1.6188647958793885);
	}

	{
		const ps = getRandomCubic(2);
		const c = totalCurvature(ps, [0,1]);
		expect(c).to.be.nearly(2**6, -5.178927914200722);
		const psr = ps.slice().reverse();
		const d = totalCurvature(psr, [0,1]);
		expect(d).to.be.nearly(2**6, 5.178927914200722);
	}

	{
		const ps = getRandomLine(0);
		const c = totalCurvature(ps, [0,1]);
		expect(c).to.be.eql(0);
	}
}


describe('totalCurvature', function() {
	it('it should calculate total curvature roughly equal to that calculated with Gauss Quadrature for some bezier curves', 
	function() {
		gaussCompare();
	});

	it('it should calculate total curvature a multiple of 2𝜋 if some bezier curves form a closed loop', 
	function() {
		testBeziersInLoop(1);
		testBeziersInLoop(2);
		testBeziersInLoop(3);
	});

    it('it should calculate the correct total curvature for some bezier curves',
	function() {
		testSomeTotalCurvature();
	});
});


describe('totalAbsoluteCurvature', function() {
    it('it should calculate the correct total absolute curvature for some bezier curves', 
	function() {
		{
			// straight quadratic bezier
			const ps = randomRotateAndTranslate(0)([[0,0],[1,1],[3,3]]);
			const d = totalAbsoluteCurvature(ps, [0,1]);
			expect(d).to.be.nearly([2**4], 0);
		}

		{
			// self-overlapping quadratic bezier
			const ps = randomRotateAndTranslate(2)([[1,1],[2,2],[1.1,1.1]]);
			const d = totalAbsoluteCurvature(ps, [0,1]);
			expect(d).to.be.nearly(2**4, Math.PI);
		}

		{
			// `ps` has no inflections
			const ps = getRandomCubic(0);
			const d = totalAbsoluteCurvature(ps, [0,1]);
			const e = totalAbsoluteCurvature(ps.slice().reverse(), [0,1]);
			expect(d).to.be.nearly(2**6, 1.289670890832218);
			expect(e).to.be.nearly(2**6, 1.289670890832218);
		}

		{
			// `ps` has 2 inflections
			const ps = [[0,0],[3.5,5],[2.5,5],[6,0]];
			const d = totalAbsoluteCurvature(ps, [0,1]);
			const e = totalAbsoluteCurvature(ps.slice().reverse(), [0,1]);
			expect(d).to.be.nearly(2**6, 1.999553581786523);
			expect(e).to.be.nearly(2**6, 1.999553581786523);
		}

		{
			// `ps` is a loop
			const ps = [[0,0],[11,5],[2.5,5],[6,0]];
			const d = totalAbsoluteCurvature(ps, [0,1]);
			const e = totalAbsoluteCurvature(ps.slice().reverse(), [0,1]);
			expect(d).to.be.nearly(2**6, 4.8964874516470225);
			expect(e).to.be.nearly(2**6, 4.8964874516470225);
		}

		{
			// some quadratic bezier
			const ps = getRandomQuad(0);
			const d = totalAbsoluteCurvature(ps, [0,1]);
			expect(d).to.be.nearly(2**6, 1.6188647958793885);
		}

		{
			const ps = getRandomLine(0);
			const d = totalAbsoluteCurvature(ps, [0,1]);
			expect(d).to.be.eql(0);
		}

		{
			const ps = getRandomPoint(0);
			const d = totalAbsoluteCurvature(ps, [0,1]);
			expect(d).to.be.eql(0);
		}

		{
			const ps = getRandomCubic(0);
			const d = totalAbsoluteCurvature(ps, [0.5,0.5]);
			expect(d).to.eql(0);

			const p = [3,3];
			expect(() => totalAbsoluteCurvature([p,p,p,p,p], [0.5,0.5])).to.throw();
		}

		{
			const ps = getRandomCubic(0);
			const d = totalCurvature(ps, [0.5,0.5]);
			expect(d).to.eql(0);
		}

		{
			const ps = [[0,0],[1,1],[1,1],[2,2]];
			const d = totalCurvature(ps, [0,1]);
			expect(d).to.eql(0);
		}

		{
			const ps = [[0,0],[1,1],[1,1],[2,0]];
			const d = totalCurvature(ps, [0,1]);
			expect(d).to.be.nearly(2**1,-𝜋/2);
		}

		{
			const p = [3,3];
			expect(() => totalCurvature([p,p,p,p,p], [0.5,1.5])).to.throw();
		}
	});
});
