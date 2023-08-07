import { ddMultDd, ddAddDd, ddDiffDd, twoDiff, ddAddDouble } from "double-double";

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const qmq = ddMultDd;
const qaq = ddAddDd;
const qdq = ddDiffDd;
const td  = twoDiff;
const qad = ddAddDouble;


/** 
 * Returns the resulting point (in double-double precision) of evaluating the 
 * given bezier curve at the given parameter `t` (given as a double-double 
 * precision floating point number).
 * 
 * * uses [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * with intermediate calculations done in double-double precision floating point 
 * arithmetic.
 * 
 * * to get an absolute error bound on the result call [[evalDeCasteljauError]]
 * 
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated (given in 
 * double-double precision)
 * 
 * @doc mdx
 **/
function evalDeCasteljauDd(
		ps: number[][], 
		t: number[]): number[][] {

	if (t[0] === 0 && t[1] === 0) {
		return ps[0].map(c => [0,c]);
	} else if (t[0] === 0 && t[1] === 1) {
		return ps[ps.length-1].map(c => [0,c]);
	}

	if (ps.length === 4) {
		const [[x0, y0], [x1,y1], [x2,y2], [x3, y3]] = ps;	
		
		const a01 = qad(qmq(td(x1, x0),t), x0);
		const a11 = qad(qmq(td(x2, x1),t), x1);
		const a21 = qad(qmq(td(x3, x2),t), x2);
		const a02 = qaq(a01, qmq(qdq(a11, a01),t));
		const a12 = qaq(a11, qmq(qdq(a21, a11),t));
		const x   = qaq(a02, qmq(qdq(a12, a02),t));

		const b01 = qad(qmq(td(y1, y0),t), y0);
		const b11 = qad(qmq(td(y2, y1),t), y1);
		const b21 = qad(qmq(td(y3, y2),t), y2);
		const b02 = qaq(b01, qmq(qdq(b11, b01),t));
		const b12 = qaq(b11, qmq(qdq(b21, b11),t));
		const y   = qaq(b02, qmq(qdq(b12, b02),t));

		return [x,y];
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;	

		const a01 = qaq([0,x0],qmq(td(x1, x0),t));
		const a11 = qaq([0,x1],qmq(td(x2, x1),t));
		const x = qaq(a01,qmq(qdq(a11,a01),t));

		const b01 = qaq([0,y0],qmq(td(y1, y0),t));
		const b11 = qaq([0,y1],qmq(td(y2, y1),t));
		const y = qaq(b01,qmq(qdq(b11,b01),t));

		return [x,y];
	} 
	
	if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;	

		const x = qad(qmq(td(x1, x0),t), x0);
		const y = qad(qmq(td(y1, y0),t), y0);

		return [x,y];
	}

	if (ps.length === 1) {
		const [x,y] = ps[0];

        return [[0,x], [0,y]];
	}
	
	
    throw new Error('The given bezier curve must be of order <= 3.');
}


export { evalDeCasteljauDd }
