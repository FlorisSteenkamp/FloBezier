
import { twoProduct, scaleExpansion, calculate, fastExpansionSum, calculateSum, expansionProduct } from "flo-numerical";


/** 
 * Evaluates the given bezier curve at the parameter t. This function is 
 * curried.
 * @param ps A line, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value where the bezier should be evaluated
 * @returns The resultant point. 
 **/
function evaluate(ps: number[][]): (t: number) => number[];
function evaluate(ps: number[][], t: number): number[];
function evaluate(ps: number[][], t?: number) {
	const len = ps.length;

	return t === undefined ? f : f(t);
	
	function f(t: number): number[] {
		if (t === 0) {
			return ps[0];
		} else if (t === 1) {
			return ps[len-1];
		}
	
		let s = 1-t;

		if (ps.length === 4) {
			// cubic
			let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
			let x = x0*s**3 + 3*x1*s**2*t + 3*x2*s*t**2 + x3*t**3;
			let y = y0*s**3 + 3*y1*s**2*t + 3*y2*s*t**2 + y3*t**3;
			return [x,y];
		} 
		
		if (ps.length === 3) {
			// quadratic
			let [[x0,y0],[x1,y1],[x2,y2]] = ps;
			let x = x0*s**2 + 2*x1*s*t + x2*t**2;
			let y = y0*s**2 + 2*y1*s*t + y2*t**2;
			return [x,y];
		} 
		
		if (ps.length === 2) {
			// line
			let [[x0,y0],[x1,y1]] = ps;
			let x = x0*s + x1*t;
			let y = y0*s + y1*t;
			return [x,y];
		}
	}
}


function evaluateExact(ps: number[][], t: number): number[][] {
	const len = ps.length;

	if (t === 0) {
		return ps[0].map(c => [c]);
	} else if (t === 1) {
		return ps[len-1].map(c => [c]);
	}

	let s = 1-t;
    let s2 = twoProduct(s,s);
    let s3 = scaleExpansion(s2, s);
    let t2 = twoProduct(t,t);
    let t3 = scaleExpansion(t2,t);

	if (ps.length === 4) {
		// cubic
		let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
		//let x = x0*s3 + 3*x1*s2*t + 3*x2*s*t2 + x3*t3;
		//let y = y0*s3 + 3*y1*s2*t + 3*y2*s*t2 + y3*t3;
		let x = calculateSum([ 
			scaleExpansion(s3,x0), 
			expansionProduct(scaleExpansion(twoProduct(3,x1),t), s2),
			expansionProduct(scaleExpansion(twoProduct(3,x2),s), t2),
			scaleExpansion(t3,x3)
		]);
		let y = calculateSum([ 
			scaleExpansion(s3,y0), 
			expansionProduct(scaleExpansion(twoProduct(3,y1),t), s2),
			expansionProduct(scaleExpansion(twoProduct(3,y2),s), t2),
			scaleExpansion(t3,y3)
		]);

		return [x,y];
	} 
	
	if (ps.length === 3) {
		// quadratic
		let [[x0,y0],[x1,y1],[x2,y2]] = ps;
		//let x = x0*s**2 + 2*x1*s*t + x2*t**2;
		//let y = y0*s**2 + 2*y1*s*t + y2*t**2;
		let x = calculateSum([ 
			scaleExpansion(s2,x0),
			scaleExpansion(twoProduct(2*x1,s), t),
			scaleExpansion(t2,x2)
		]);
		let y = calculateSum([ 
			scaleExpansion(s2,y0),
			scaleExpansion(twoProduct(2*y1,s), t),
			scaleExpansion(t2,y2)
		]);

		return [x,y];
	} 
	
	if (ps.length === 2) {
		// line
		let [[x0,y0],[x1,y1]] = ps;
		let x = fastExpansionSum(twoProduct(x0,s), twoProduct(x1,t));
		let y = fastExpansionSum(twoProduct(y0,s), twoProduct(y1,t));;

		return [x,y];
	}
}


function expEvaluateExact(ps: number[][][], t: number): number[][] {
	const len = ps.length;

	if (t === 0) {
		return ps[0];
	} else if (t === 1) {
		return ps[len-1];
	}

	let s = 1-t;
    let s2 = twoProduct(s,s);
    let s3 = scaleExpansion(s2, s);
    let t2 = twoProduct(t,t);
    let t3 = scaleExpansion(t2,t);
    let st = twoProduct(s, t);
    let st2 = scaleExpansion(t2, s);
    let s2t = scaleExpansion(s2, t);

	if (ps.length === 4) {
		// cubic
		let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
		//let x = x0*s3 + 3*x1*s2*t + 3*x2*s*t2 + x3*t3;
		//let y = y0*s3 + 3*y1*s2*t + 3*y2*s*t2 + y3*t3;
		let x = calculate([ [x0,s3], [[3],x1,s2,[t]], [[3],x2,[s],t2], [x3,t3] ]);
		let y = calculate([ [y0,s3], [[3],y1,s2,[t]], [[3],y2,[s],t2], [y3,t3] ]);

		return [x,y];
	} 
	
	if (ps.length === 3) {
		// quadratic
		let [[x0,y0],[x1,y1],[x2,y2]] = ps;
		//let x = x0*s**2 + 2*x1*s*t + x2*t**2;
		//let y = y0*s**2 + 2*y1*s*t + y2*t**2;
		let x = calculate([ [x0,s2], [x1,[2*s],[t]], [x2,t2] ]);
		let y = calculate([ [y0,s2], [y1,[2*s],[t]], [y2,t2] ]);
		return [x,y];
	} 
	
	if (ps.length === 2) {
		// line
		let [[x0,y0],[x1,y1]] = ps;
		let x = fastExpansionSum(scaleExpansion(x0,s), scaleExpansion(x1,t));
		let y = fastExpansionSum(scaleExpansion(y0,s), scaleExpansion(y1,t));;

		return [x,y];
	}
}


export { evaluate, evaluateExact, expEvaluateExact }
