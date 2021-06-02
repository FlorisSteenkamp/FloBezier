import { ddAddDd, ddDiffDd, ddMultDd, twoDiff, twoProduct, twoSum } from "double-double";

const td = twoDiff;
const tp = twoProduct;
const ts = twoSum;
const qaq = ddAddDd;
const qdq = ddDiffDd;
const qmq = ddMultDd;


/**
 * @param pS any point on the line
 * @param pS any other point on the line
 * 
 * @internal
 */
function getDistanceToLineFunction(
		pS: number[],
		pE: number[]): (p: number[]) => number {

	//console.log(pS,pE);
	const xS = pS[0];
	const yS = pS[1];
	const xE = pE[0];
	const yE = pE[1];
	const s = yS - yE;
	const t = xE - xS;
	const u = xS*yE - xE*yS;

	const d = Math.sqrt(s**2 + t**2);

	const ss = s/d;
	const tt = t/d;
	const uu = u/d;

	return function(p: number[]) {
		//console.log(s,t,u,d)
		return ss*p[0] + tt*p[1] + uu;
	}
}


/**
 * just to test
 * @param pS 
 * @param pE 
 * @returns 
 */
function getDistanceToLineFunctionDd(
		pS: number[],
		pE: number[]): (p: number[]) => number {

	//console.log(pS,pE);
	const xS = pS[0];
	const yS = pS[1];
	const xE = pE[0];
	const yE = pE[1];

	const s = td(yS, yE);
	const t = td(xE, xS);

	const u = qdq(tp(xS,yE), tp(xE,yS));

	//const d = Math.sqrt(qaq(qmq(s,s), qmq(t,t))[1]);
	const d = Math.sqrt(ts(s[1]*s[1], t[1]*t[1])[1]);

	const ss = s[1]/d;
	const tt = t[1]/d;
	const uu = u[1]/d;

	return function(p: number[]) {
		//console.log(s,t,u,d)
		return ss*p[0] + tt*p[1] + uu;
	}
}


export { getDistanceToLineFunction, getDistanceToLineFunctionDd }
//export { getDistanceToLineFunction as getDistanceToLineFunctionDd, getDistanceToLineFunctionDd as getDistanceToLineFunction }
