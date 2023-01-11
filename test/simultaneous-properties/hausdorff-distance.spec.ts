import { expect, assert, use } from 'chai';
import { distanceBetween, toUnitVector, translate } from 'flo-vector2d';
import { describe } from 'mocha';
import { squares } from 'squares-rng';
import { maxAbsCoordinate } from '../../src/error-analysis/max-abs-coordinate.js';
import { 
	closestPointOnBezier, controlPointLinesLength, curvature, evalDeCasteljau, 
	fromPowerBasis, fromToInclErrorBound, generateQuarterCircle, hausdorffDistance, 
	hausdorffDistanceOneSided, lineToQuadratic, normal, toCubic, toString 
} from '../../src/index.js';
import { Heap } from '../../src/simultaneous-properties/hausdorff-distance/heap.js';
// import { hausdorffDistanceOneSided_ } from '../../src/simultaneous-properties/hausdorff-distance/hausdorff-distance.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../helpers/get-random-bezier.js';
import { H, HH } from '../helpers/hausdorff-distance-naive.js';
import { heapToStr } from '../helpers/heap-to-str.js';
// import { HHkm, Hkm } from '../helpers/hausdorff-distance-km.js';


use(nearly);

const { sqrt, max } = Math;


describe('hausdorffDistance', function() {
	it('the bindary heap accompanying the algorithm should work as expected',
	function() {
		{
			// Test the heap used with the algorithm
			const heap = new Heap<number>((a,b) => a - b);
			const arr: number[] = [];
			const len = 100;
			for (let i=0; i<len; i++) {
				const v = squares(i);
				heap.insert(v);
				arr.push(v);
			}
			const heapArr: number[] = [];
			while (true) {
				// heapToStr<number>(v => v.toString())(heap);
				const v = heap.popMax()
				if (v === undefined) { break; }
				heapArr.push(v);
			}
			heapArr.reverse();
			arr.sort((a,b) => a - b);

			expect(arr).to.eql(heapArr);
		}
	});
	it('it should find accurate approximate hausdorff distances for some curves',
	function() {
		{
			const A = [
				[-0.490590559784323,0.4700336614623666],
				[-0.4844732536017821,0.39528111773933156],
				[-0.3550743653512093,0.06666619155599329],
				[-0.2819309411570433,0.08326148381456788]
			];
			const B = [
				[-0.3116935109719634,0.05215876316651702],
				[-0.29430396390165803,0.1677451716773273],
				[-0.886019985785059,0.20060425215062785],
				[-0.9510351778008026,0.29774146946147256]
			];

			const hd = hausdorffDistance(A,B);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(hd).to.be.nearly(2**1,0.4867916480715152);
		}
		{
			// Test some line-lines

			const A = [[1,1],[2,2]];
			const B = [[0,0],[5,0]];

			const AB = hausdorffDistanceOneSided(A,B);
			const BA = hausdorffDistanceOneSided(B,A);
			const hd = hausdorffDistance(A,B);

			expect(AB).to.eql(2);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(BA).to.be.nearly(2**1,(sqrt(3**2 + 2**2)));
			expect(hd).to.eql(BA);

			const A_ = A.slice().reverse();
			const B_ = B.slice().reverse();
			const AB_ = hausdorffDistanceOneSided(A_,B_);
			const BA_ = hausdorffDistanceOneSided(B_,A_);
			expect(AB_).to.eql(2);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(BA_).to.be.nearly(2**1,(sqrt(3**2 + 2**2)));
		}
		{
			// Test some line-quad

			const A = [[1,1],[2,2]];
			const B = [[0,0],[2,2**-30],[5,0]];  // almost a line

			const AB = hausdorffDistanceOneSided(A,B);
			const BA = hausdorffDistanceOneSided(B,A);
			const hd = hausdorffDistance(A,B);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(AB).to.be.nearly(2**20,2);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(BA).to.be.nearly(2**1,(sqrt(3**2 + 2**2)));
			expect(hd).to.eql(BA);

			// estimate Hausdorff distance
			const hh = HH(A,B,10);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(hd).to.be.nearly(2**4,hh);
		}
		{
			// Test a crafted line to quad - https://www.desmos.com/calculator/uyl4qedxkp
			const A = [[-1,2],[1,2]];
			const Bxy = [[0,1,0],[1,0,0]]; // y = x^2 for x ∈ [0,1]
			const B01 = fromPowerBasis(Bxy);
			const B = fromToInclErrorBound(B01,-1,2).ps; // y = x^2 for x ∈ [-1,2]
			toString(B);  //=> [[-1,1],[0.5,-2],[2,4]]

			//------------------------------------
			// const k = curvature(B01,0);  // 2
			// const k0 = curvature(B,0);
			// const k1 = curvature(B,1);
			// const r0 = 1/k0;
			// const r1 = 1/k1;
			// const v0 = toUnitVector(normal(B,0));
			// const v1 = toUnitVector(normal(B,1));
			// x0 = -1 + (5.5901699437494745 * 0.894427190999916)
			// y0 = 1 + (5.5901699437494745 * 0.447213595499958)
			// x1 = 2 + (-0.9701425001453319 * 35.04639781775011)
			// y1 = 4 + (0.24253562503633297 * 35.04639781775011)
			//------------------------------------

			const h = hausdorffDistanceOneSided(A,B);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(h).to.be.nearly(2**32, 1.3749758408573243);

			// h should be 1.3749758408573243 occuring at 
			//   A: t = 0.4718470522694049
			//   B: s = 0.73841681234051

			// estimate Hausdorff distance
			const hAB = H(A,B,0.1);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(h).to.be.nearly(2**44,hAB);
		}
		{
			// Test some cubic-cubic
			const A = getRandomCubic(2);
			const B = getRandomCubic(3);
			A[0] = B[0];
			A[A.length-1] = B[B.length-1];

			const tol = 1/1000_000_000;
			const AB = hausdorffDistanceOneSided(A,B);
			const BA = hausdorffDistanceOneSided(B,A);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(AB).to.be.nearly(2**32,29.147780233490522);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(BA).to.be.nearly(2**32,27.36950949488669);

			// estimate Hausdorff distance
			const hAB = H(A,B,1);
			const hBA = H(B,A,1);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(AB).to.be.nearly(2**44,hAB);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(BA).to.be.nearly(2**44,hBA);
		}
		{
			// Test some quad-quad
			const A = [[-11, -81], [-42, 3], [18, -24]];
			const B = [[-109,-75],[-7,-108],[11,-24]];

			const tol = 1/1000_000_000;
			const AB = hausdorffDistanceOneSided(A,B);
			const BA = hausdorffDistanceOneSided(B,A);
			const h = hausdorffDistance(A,B,tol);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(AB).to.be.nearly(2**32, 29.41592345293623);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(BA).to.be.nearly(2**32, 92.13090734616078);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(h).to.be.nearly(2**32, 92.13090734616078);
		}
		{
			// Test some quad-quad
			const A = getRandomQuad(0);
			const B = getRandomQuad(1);
			A[0] = B[0];
			A[A.length-1] = B[B.length-1];
			const tol = 1/1000_000;
			const maxIterations = 100;
			const AB = hausdorffDistanceOneSided(A,B,tol,maxIterations);
			const BA = hausdorffDistanceOneSided(B,A,tol,maxIterations);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(AB).to.be.nearly(2**32,34.29678192323552);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(BA).to.be.nearly(2**32,13.860492759353555);
		}
		{
			// Let's create a mildly pathological case (where all distances from
			// one curve to the other is roughly equal)
			const A = getRandomCubic(2);
			const B = A.map(translate([-1.2,0]));

			const tol = 1/1000_000_000;
			const AB = hausdorffDistanceOneSided(A,B,tol);
			const BA = hausdorffDistanceOneSided(B,A,tol);
			const h = max(AB,BA);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(h).to.be.nearly(2**22,1.2);
		}
		{
			// Let's create a highly pathological case (where all distances from
			// one curve to the other is roughly equal) by approximating two
			// concentric quarter circles - see https://spencermortensen.com/articles/bezier-circle/
			const A = generateQuarterCircle(100,[0,0]);
			const B = generateQuarterCircle(99,[0,0]);

			const tol = 1/1000_000_000;
			const h = hausdorffDistance(A,B,tol);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(h).to.be.nearly(2**42,1)
		}
		{
			// Let's create an extremely pathological case (where all distances from
			// one curve to the other is roughly equal) by using two parallel lines of 
			// the same length.
			const e = 2**-10;
			const A = [[0,0],[1,0],[2,0],[3,0]];
			const B = [[0,e],[1,e],[2,e],[3,e]];

			const tol = 1/1000_000_000;
			const h = hausdorffDistance(B,A,tol);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(h).to.be.nearly(2**0,e);
		}

		{
			// Let's create another highly pathological case.
			const e = 2**-10;
			const A = [[0,0],[1,1],[2,1],[3,0]];
			const B = [[0,0],[1,1+e],[2,1],[3,0]];

			const tol = 1/1000_000_000;
			const h = hausdorffDistance(B,A,tol);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(h).to.be.nearly(2**32,0.0004163441673260007);
		}

		{
			// Some special cases 1
			const A = [[1,1]];
			const B = [[1,2],[3,4],[4,3],[2,1]];
			const AB = hausdorffDistanceOneSided(A,B);
			const BA = hausdorffDistanceOneSided(B,A);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(AB).to.be.nearly(2**4, 1);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(BA).to.be.nearly(2**4, 2*sqrt(2));
		}
	});
});
