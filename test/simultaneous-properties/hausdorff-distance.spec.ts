import { expect, assert, use } from 'chai';
import { distanceBetween, toUnitVector, translate } from 'flo-vector2d';
import { describe } from 'mocha';
import { squares } from 'squares-rng';
import { 
	closestPointOnBezier, controlPointLinesLength, curvature, evalDeCasteljau, 
	fromPowerBasis, fromTo, generateQuarterCircle, hausdorffDistance, 
	hausdorffDistanceOneSided, lineToQuadratic, normal, toCubic, toString 
} from '../../src/index.js';
import { Heap } from '../../src/simultaneous-properties/hausdorff-distance/heap.js';
// import { hausdorffDistanceOneSided_ } from '../../src/simultaneous-properties/hausdorff-distance/hausdorff-distance.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../helpers/get-random-bezier.js';
import { heapToStr } from '../helpers/heap-to-str.js';
// import { HHkm, Hkm } from '../helpers/hausdorff-distance-km.js';


use(nearly);


function testOneSidedHausdorffFunction(
		f: (A: number[][], B: number[][]) => number[]) {

	const A = getRandomCubic(2);
	const B = getRandomCubic(3);
	A[0] = B[0];
	A[A.length-1] = B[B.length-1];

	// const hh = HH(A,B,10);  // estimate Hausdorff distance

	const tol = 1/1000_000_000;
	const [lower, upper] = f(A,B);

	expect(lower).to.be.greaterThanOrEqual(57.378896617476535);
	expect(upper).to.be.lessThanOrEqual   (57.37889719292597);

	const re = calcRelErr(A,B,lower,upper);
	expect(re).to.be.lessThan(1e-9);
}


describe('hausdorffDistance', function() {
	it('it should ...',
	function() {
		/*
		{
			const A = [[-11, -81], [-42, 3], [18, -24]];
			const B = [[-109,-75],[-7,-108],[11,-24]];
			//toCubic(A).toString();
			//B.toString();

			const tol = 1/1000_000_000;
			Hkm(A,B,tol)[0];               //?

			hausdorffDistanceOneSided(A,B);//?
		}
		*/
		
		/*
		{
			const A = getRandomQuad(0);
			const B = getRandomQuad(1);
			A[0] = B[0];
			A[A.length-1] = B[B.length-1];
			//toCubic(A); // -94.81526242914035, -85.23564826446484, -33.599165059998434, -59.15838891651754, 24.73211536387264, -64.62996111824874, 80.17857884247289, -101.65036486965846
			//B; // -94.81526242914035, -85.23564826446484, -99.1015037230918, 6.600052566872932, 80.17857884247289, -101.65036486965846
			const tol = 1/1000_000_000;
			Hkm(A,B,tol);//?

			hausdorffDistanceOneSided(A,B);//?
		}
		*/


		/*
		{
			const A = getRandomCubic(2);
			const B = getRandomCubic(3);
			A[0] = B[0];
			A[A.length-1] = B[B.length-1];

			// const hh = HH(A,B,10);  // estimate Hausdorff distance

			const tol = 1/1000_000_000;
			testOneSidedHausdorffFunction(
				(A,B) => Hkm(A,B,tol)
			);
		}
		*/


		/*
		{
			const A = getRandomCubic(2);
			const B = getRandomCubic(3);

			// const hh = HH(A,B,100);//?

			const tol = 1/1000_000_000;
			const [lower, upper] = hausdorffDistance(B,A,tol);

			const re = calcRelErr(A,B,lower,upper);
			expect(re).to.be.lessThan(1e-9);
		}
		*/

		/*
		{
			// Let's create a mildly pathological case (where all distances from
			// one curve to the other is roughly equal)
			const A = getRandomCubic(2);//?
			const B = A.map(translate([-1,0]));

			// const hh = HH(A,B,100);//?

			const tol = 1/1000_000_000;
			const [lower, upper] = hausdorffDistance(B,A,tol);

			const re = calcRelErr(A,B,lower,upper);
			expect(re).to.be.lessThan(1e-9);
		}
		*/

		/*
		{
			// Let's create a highly pathological case (where all distances from
			// one curve to the other is roughly equal) by approximating two
			// concentric quarter circles - see https://spencermortensen.com/articles/bezier-circle/
			const A = generateQuarterCircle(100,[0,0]);
			const B = generateQuarterCircle(99,[0,0]);

			// const hh = HH(A,B,100);//?

			const tol = 1/1000_000_000;
			// const [lower, upper] = hausdorffDistance(B,A,tol);
			const h = hausdorffDistance(B,A,tol);
			const h1 = HHkm(B,A,tol);

			//const re = calcRelErr(A,B,lower,upper);
			//expect(re).to.be.lessThan(1e-9);
		}
		*/


		/*
		{
			// Let's create an extremely pathological case (where all distances from
			// one curve to the other is roughly equal) by using two parallel lines of 
			// the same length.
			const e = 2**-10;
			const A = [[0,0],[1,0],[2,0],[3,0]];
			const B = [[0,e],[1,e],[2,e],[3,e]];

			const tol = 1/1000_000_000;
			const [lower, upper] = hausdorffDistance(B,A,tol);//?

			const re = calcRelErr(A,B,lower,upper);
			expect(re).to.be.lessThan(1e-9);
		}
		*/

		/*
		{
			// Let's create the ultimate? pathological case.
			// In this case we cannot (even in principle) get a good relative 
			// error when the error is tested against the actual Hausdorff 
			// distance, but we can hope for a good relative error against the 
			// total curve lengths
			const e = 2**-10;
			const A = [[0,0],[1,1],[2,1],[3,0]];
			const B = [[0,0],[1,1+e],[2,1],[3,0]];

			const tol = 1/1000_000_000;
			const [lower, upper] = HHkm(B,A,tol);//?

			const re = calcRelErr(A,B,lower,upper);
			expect(re).to.be.lessThan(1e-9);
		}
		*/

		/*
		{
			// Let's create a mildly pathological case (where all distances from
			// one curve to the other is roughly equal)
			const A = getRandomQuad(2);
			// A.toString()//?
			const B = A.map(translate([0,0.0001]));
			// toCubic(B).toString();//?

			// const hh = HH(A,B,100);//?

			const tol = 1/1000_000;
			const h = hausdorffDistanceOneSided(B,A);//?
			const h1 = Hkm(B,A,tol);//?
		}
		*/

		/*
		{
			// Test line to quad
			const B = getRandomQuad(14);
			toCubic(B).toString();//?
			const A = [B[0],B[2]];
			lineToQuadratic(A).toString()//?
			
			const tol = 1/1000_000;
			const h = hausdorffDistanceOneSided(A,B);//?
			const h1 = Hkm(A,B,tol);//?
		}
		*/
		{
			// Test the heap used with the algorithm
			const heap = new Heap<number>((a,b) => a - b);
			const arr: number[] = [];
			// const source: number[] = [3,2,1];
			const len = 13;
			for (let i=0; i<len; i++) {
				const v = squares(i);
				// const v = source[i];
				heap.insert(v);
				arr.push(v);
			}
			const heapArr: number[] = [];
			while (true) {
				// heapToStr<number>(v => v.toString())(heap);//?
				const v = heap.popMax()
				if (v === undefined) { break; }
				heapArr.push(v);
			}
			heapArr.reverse();
			arr.sort((a,b) => a - b);

			expect(arr).to.eql(heapArr);
		}
		{
			// Test line to quad - https://www.desmos.com/calculator/uyl4qedxkp
			const A = [[-1,2],[1,2]];
			const Bxy = [[0,1,0],[1,0,0]]; // y = x^2 for x ∈ [0,1]
			const B01 = fromPowerBasis(Bxy);
			const k = curvature(B01,0);// 2
			const B = fromTo(B01,-1,2).ps; // y = x^2 for x ∈ [-1,2]
			toString(A);//  [[0,0],[1,1]
			//A[0] = [-1.0001,2];
			//B[0] = [-0.9999,1];
			//B[1] = [0.5,-2];
			toString(B);//  [[-1,1],[0.5,-2],[2,4]]

			//------------------------------------
			// const k0 = curvature(B,0);
			// const k1 = curvature(B,1);
			// const r0 = 1/k0;//?
			// const r1 = 1/k1;//?
			// const v0 = toUnitVector(normal(B,0));//?
			// const v1 = toUnitVector(normal(B,1));//?
			// x0 = -1 + (5.5901699437494745 * 0.894427190999916)//?
			// y0 = 1 + (5.5901699437494745 * 0.447213595499958)//?
			// x1 = 2 + (-0.9701425001453319 * 35.04639781775011)//?
			// y1 = 4 + (0.24253562503633297 * 35.04639781775011)//?
			//------------------------------------

			const tol = 1/1000_000;
			
			const h = hausdorffDistanceOneSided(A,B);  //?
			// const h_ = hausdorffDistanceOneSided_(A,B);//?
			// const h1 = Hkm(A,B,tol);//?
			1.3749758408573243 - h[0];//?

			// h should be about 1.3749758408573243 occuring at 
			//   A: t = 0.4718470522694049
			//   B: s = 0.73841681234051
			//const t = 0.4718470522694049;
			//const s = 0.73841681234051;
			//const p1 = evalDeCasteljau(A,t);//?
			//const p2 = evalDeCasteljau(B,s);//?

			// distanceBetween(p1,p2);      //?
			// closestPointOnBezier(B,p1).d;//?
			// distanceBetween([-1,1],p1)   //?
		}
		/*
		{
			// Test quad to quad - https://www.desmos.com/calculator/uyl4qedxkp
			// const A = [[-1,2],[1,2]];
			// const Bxy = [[0,1,0],[1,0,0]]; // y = x^2 for x ∈ [0,1]
			const A = [[-1,2],[0,2],[1,2]];
			const Bxy = [[0,1,0],[1,0,0]]; // y = x^2 for x ∈ [0,1]
			const B01 = fromPowerBasis(Bxy);
			const k = curvature(B01,0);// 2
			const B = fromTo(B01,-1,2).ps; // y = x^2 for x ∈ [-1,2]
			toString(A);//  [[0,0],[1,1]
			toString(B);//  [[-1,1],[0.5,-2],[2,4]]
			
			const tol = 1/1000_000;
			
			const h = hausdorffDistanceOneSided(A,B);//?
			const h1 = Hkm(A,B,tol);//?

			// h should be about 1.3749758408573243 occuring at 
			//   A: t = 0.4718470522694049
			//   B: s = 0.73841681234051
			const t = 0.4718470522694049;
			const s = 0.73841681234051;
			const p1 = evalDeCasteljau(A,t);//?
			const p2 = evalDeCasteljau(B,s);//?

			distanceBetween(p1,p2);      //?
			closestPointOnBezier(B,p1).d;//?
			distanceBetween([-1,1],p1)   //?
		}
		*/
		/*
		{
			// Test line to cubic - https://www.desmos.com/calculator/uyl4qedxkp
			// const A = [[-1,2],[1,2]];
			// const Bxy = [[0,1,0],[1,0,0]]; // y = x^2 for x ∈ [0,1]
			const A = [[-1,2],[1,2]];
			const Bxy = [[0,1,0],[1,0,0]]; // y = x^2 for x ∈ [0,1]
			const B01 = fromPowerBasis(Bxy);
			const k = curvature(B01,0);// 2
			const B = toCubic(fromTo(B01,-1,2).ps); // y = x^2 for x ∈ [-1,2]
			toString(A);//  [[0,0],[1,1]
			toString(B);//  [[-1,1],[0,-1],[1,0],[2,4]]
			B[1] = [0.01,-1.01];
			// B.toString();//?
			
			const tol = 1/1000_000;
			
			const h = hausdorffDistanceOneSided(A,B);//?
			const h1 = Hkm(A,B,tol);//?

			// h should be about 1.3749758408573243 occuring at 
			//   A: t = 0.4718470522694049
			//   B: s = 0.73841681234051
			const t = 0.4718470522694049;
			const s = 0.73841681234051;
			const p1 = evalDeCasteljau(A,t);//?
			const p2 = evalDeCasteljau(B,s);//?

			distanceBetween(p1,p2);      //?
			closestPointOnBezier(B,p1).d;//?
			distanceBetween([-1,1],p1)   //?
		}
		*/
	});
});


function calcRelErr(
		A: number[][], B: number[][], 
		lower: number, upper: number) {

	const l = controlPointLinesLength(A) + controlPointLinesLength(B);
	const Err = (upper - lower);

	return Err/l;
}
