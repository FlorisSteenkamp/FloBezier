
import { γ } from "../../error-analysis/error-analysis";
import { ddMultDd, ddAddDd, ddDiffDd, ddMultDouble2 } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qmq = ddMultDd;
const qaq = ddAddDd;
const qdq = ddDiffDd;
const qmd = ddMultDouble2;

const abs = Math.abs;
const u = Number.EPSILON / 2;
const γ1 = γ(1);


/** 
 * Evaluates the given bezier curve at the parameter t given as a double-doulbe, 
 * including error.
 * * **precondition**: 49-bit aligned coordinates
 * @param ps An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value where the bezier should be evaluated
 **/
function evalDeCasteljauWithErrQuad(
		ps: number[][], 
		t: number[]): { p: number[][]; pE: number[]; } {

	if (t[0] === 0 && t[1] === 0) {
		return { p: ps[0].map(c => [c]), pE: [0,0] };
	} else if (t[0] === 0 && t[1] === 1) {
		return { p: ps[ps.length-1].map(c => [c]), pE: [0,0] };
	}

	//let s = 1-t;  // <= exact if eps | t, but not a precondition here
	//let s = 1 - t;  // <1>s1

	let _t = t[1];  // <= assumed positive

	if (ps.length === 4) {
		const [[x0, y0], [x1,y1], [x2,y2], [x3, y3]] = ps;	
		
		let _x0 = abs(x0);
		let _y0 = abs(y0);
		let _x1 = abs(x1);
		let _y1 = abs(y1);
		let _x2 = abs(x2);
		let _y2 = abs(y2);
		let _x3 = abs(x3);
		let _y3 = abs(y3);

		let a01 = qaq([0,x0],qmd(x1 - x0,t));  // 49-bit aligned => x1 - x0 exact
		let a11 = qaq([0,x1],qmd(x2 - x1,t));  // 49-bit aligned => x2 - x1 exact
		let a21 = qaq([0,x2],qmd(x3 - x2,t));  // 49-bit aligned => x3 - x2 exact
		let a02 = qaq(a01,qmq(qdq(a11,a01),t));
		let a12 = qaq(a11,qmq(qdq(a21,a11),t));
		let x   = qaq(a02,qmq(qdq(a12,a02),t));

		let _a01 = _x0 + (_x1 + _x0)*_t;  // <2>
		//let _a01 = <2>(_x0 + <1>((_x1 + _x0)*_t));
		let _a11 = _x1 + (_x2 + _x1)*_t;  // <2>
		//let _a11 = <2>(_x1 + <1>((_x2 + _x1)*_t));
		let _a21 = _x2 + (_x3 + _x2)*_t;  // <2>
		//let _a21 = <2>(_x2 + <1>((_x3 + _x2)*_t));
		let _a02 = _a01 + (_a11 + _a01)*_t;
		//let _a02 = <6>(<2>_a01 + <5>(<3>(<2>_a11 + <2>_a01)*_t));
		let _a12 = _a11 + (_a21 + _a11)*_t;
		//let _a12 = <6>(<2>_a11 + <5>(<3>(<2>_a21 + <2>_a11)*_t));
		let _x = _a02 + (_a12 + _a02)*_t;
		//let _x = <10>(<6>_a02 + <9>(<7>(<6>_a12 + <6>_a02)*t));
		// Note: using γ1 or u doesn't really make any practical difference
		_x = 10*γ1*γ1*_x;


		let b01 = qaq([0,y0],qmd(y1 - y0,t));  // 49-bit aligned => y1 - y0 exact
		let b11 = qaq([0,y1],qmd(y2 - y1,t));  // 49-bit aligned => y2 - y1 exact
		let b21 = qaq([0,y2],qmd(y3 - y2,t));  // 49-bit aligned => y3 - y2 exact
		let b02 = qaq(b01,qmq(qdq(b11,b01),t));
		let b12 = qaq(b11,qmq(qdq(b21,b11),t));
		let y   = qaq(b02,qmq(qdq(b12,b02),t));

		let _b01 = _y0 + (_y1 + _y0)*_t;  // <2>
		let _b11 = _y1 + (_y2 + _y1)*_t;  // <2>
		let _b21 = _y2 + (_y3 + _y2)*_t;  // <2>
		let _b02 = _b01 + (_b11 + _b01)*_t;
		let _b12 = _b11 + (_b21 + _b11)*_t;
		let _y = _b02 + (_b12 + _b02)*_t;
		_y = 10*γ1*γ1*_y;

		return { p: [x,y], pE: [_x,_y] };
	} else if (ps.length === 3) {
		const [[x0, y0], [x1,y1], [x2,y2]] = ps;	

		let _x0 = abs(x0);
		let _y0 = abs(y0);
		let _x1 = abs(x1);
		let _y1 = abs(y1);
		let _x2 = abs(x2);
		let _y2 = abs(y2);

		let a01 = qaq([0,x0],qmd(x1 - x0,t));  // 49-bit aligned => x1 - x0 exact
		let a11 = qaq([0,x1],qmd(x2 - x1,t));  // 49-bit aligned => x2 - x1 exact
		let x = qaq(a01,qmq(qdq(a11,a01),t));

		let _a01 = _x0 + (_x1 + _x0)*_t;  // <2>
		//let _a01 = <2>(_x0 + <1>((_x1 + _x0)*_t));
		let _a11 = _x1 + (_x2 + _x1)*_t;  // <2>
		//let _a11 = <2>(_x1 + <1>((_x2 + _x1)*_t));
		let _x = _a01 + (_a11 + _a01)*_t; // <6>
		//let _x = <6>(<2>_a01 + <5>(<3>(<2>_a11 + <2>_a01)*_t));
		_x = 6*γ1*γ1*_x;

		let b01 = qaq([0,y0],qmd(y1 - y0,t));  // 49-bit aligned => y1 - y0 exact
		let b11 = qaq([0,y1],qmd(y2 - y1,t));  // 49-bit aligned => y2 - y1 exact
		let y = qaq(b01,qmq(qdq(b11,b01),t));

		let _b01 = _y0 + (_y1 + _y0)*_t;  // <2>
		//let _b01 = <2>(_y0 + <1>((_y1 + _y0)*_t));
		let _b11 = _y1 + (_y2 + _y1)*_t;  // <2>
		//let _b11 = <2>(_y1 + <1>((_y2 + _y1)*_t));
		let _y = _b01 + (_b11 + _b01)*_t; // <6>
		//let _y = <6>(<2>_b01 + <5>(<3>(<2>_b11 + <2>_b01)*_t));
		_y = 6*γ1*γ1*_y;

		return { p: [x,y], pE: [_x,_y] };
	} else if (ps.length === 2) {
		const [[x0, y0], [x1,y1]] = ps;	

		let _x0 = abs(x0);
		let _y0 = abs(y0);
		let _x1 = abs(x1);
		let _y1 = abs(y1);

		let x = qaq([0,x0],qmd(x1 - x0,t));  // 49-bit aligned => x1 - x0 exact;
		let y = qaq([0,y0],qmd(y1 - y0,t));  // 49-bit aligned => y1 - y0 exact

		let _x = _x0 + (_x1 + _x0)*_t;  // <2>
		//let _x = <2>(_x0 + <1>((_x1 + _x0)*_t));
		_x = 2*γ1*γ1*_x;

		let _y = _y0 + (_y1 + _y0)*_t;  // <2>
		//let _y = <2>(_y0 + <1>((_y1 + _y0)*_t));
		_y = 2*γ1*γ1*_y;

		return { p: [x,y], pE: [_x,_y] };
	}
}


export { evalDeCasteljauWithErrQuad }
