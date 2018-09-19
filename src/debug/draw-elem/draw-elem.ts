
declare let _bez_debug_: BezDebug; 

import { fromTo, translate, toLength } from 'flo-vector2d';

import { BezDebug, DebugElemType } from '../debug';
import { FatLine } from '../fat-line';


export type TDrawElemFunctions = {
	[T in DebugElemType]: (g: SVGGElement, elem: any) => SVGElement[];
}

export interface IDrawElemFunctions extends TDrawElemFunctions {
	beziers          : (g: SVGGElement, beziers: number[][][]) => SVGElement[];
	intersection     : (g: SVGGElement, p: number[]) => SVGElement[];
	extreme          : (g: SVGGElement, extreme: {p: number[], t: number}) => SVGElement[];
	looseBoundingBox : (g: SVGGElement, box: number[][]) => SVGElement[];
	tightBoundingBox : (g: SVGGElement, box: number[][]) => SVGElement[];
	boundingHull     : (g: SVGGElement, hull: number[][]) => SVGElement[];
	fatLine          : (g: SVGGElement, fatLine: FatLine) => SVGElement[];
}


function fatLine(g: SVGGElement, fatLine: FatLine) {
	let draw = _bez_debug_.fs.draw;

	let { l, minD, maxD } = fatLine;

	let [lp1, lp2] = l;

	const E = 1024;
	let lv = fromTo(lp1, lp2);
	let lvTimes10 = [+E*lv[0], +E*lv[1]];
	let reverseLvTimes10 = [-E*lv[0], -E*lv[1]];

	let normal = [-lv[1], lv[0]]; // Rotate by -90 degrees
	let normMin = toLength(normal, minD);
	let normMax = toLength(normal, maxD);

	let extLp1 = translate(lp1, reverseLvTimes10);
	let extLp2 = translate(lp2, lvTimes10);

	let nl11 = translate(extLp1, normMin);
	let nl12 = translate(extLp2, normMin);

	let nl21 = translate(extLp1, normMax);
	let nl22 = translate(extLp2, normMax);

	let nl1 = [nl11, nl12];
	let nl2 = [nl21, nl22];

	let $line1 = draw.line(g, nl1);
	let $line2 = draw.line(g, nl2);

	return [...$line1, ...$line2];
}


function beziers(g: SVGGElement, beziers: number[][][]) {
	let draw = _bez_debug_.fs.draw;

    let $bezier1 = draw.bezier( 
        g, beziers[0], 'blue thin5 nofill'
	);
	let $bezier2 = draw.bezier( 
		g, beziers[1], 'green thin5 nofill'
	);

	let size = getSize([...beziers[0], ...beziers[1]]) / 400;
	
	let $dots = [
		...draw.dot(g, beziers[0][0], size, 'blue'),
		...draw.dot(g, beziers[0][1], size, 'blue'),
		...draw.dot(g, beziers[0][2], size, 'blue'),
		...draw.dot(g, beziers[0][3], size, 'blue'),
		...draw.dot(g, beziers[1][0], size, 'green'),
		...draw.dot(g, beziers[1][1], size, 'green'),
		...draw.dot(g, beziers[1][2], size, 'green'),
		...draw.dot(g, beziers[1][3], size, 'green'),
	]

    return [...$bezier1, ...$bezier2, ...$dots];
}


function getSize(ps: number[][]) {
    let minX: number = Number.POSITIVE_INFINITY;
    let minY: number = Number.POSITIVE_INFINITY;
    let maxX: number = Number.NEGATIVE_INFINITY;
    let maxY: number = Number.NEGATIVE_INFINITY;

    for (let p of ps) {
        if (p[0] < minX) { minX = p[0] }
        if (p[1] < minY) { minY = p[1] }
        if (p[0] > maxX) { maxX = p[0] }
        if (p[1] > maxY) { maxY = p[1] }
    }

    let width  = maxX - minX;
    let height = maxY - minY;

    return Math.max(width, height);
}


function intersection(
		g: SVGGElement,
		p: number[]) {

    let $elems = _bez_debug_.fs.draw.crossHair( 
        	g, p, 'red thin5 nofill', 0.05
	);  
	
    return $elems;
}


function extreme(
		g: SVGGElement, 
		extreme: {p: number[], t: number}) {	

    let $elems = _bez_debug_.fs.draw.crossHair( 
            g, extreme.p, 'red thin10 nofill', 0.05
	);  
	
    return $elems;
}
		
		
function boundingHull(
			g: SVGGElement,
			hull: number[][]) {

	let $polygon = _bez_debug_.fs.draw.polygon(g, hull, 'thin5 black nofill');

	return $polygon;
}


function looseBoundingBox(
		g: SVGGElement,
		box: number[][]) {

	let $box = _bez_debug_.fs.draw.rect(
		g, box, 'thin5 brown nofill'
	);
	
	return $box;
}


function tightBoundingBox(
		g: SVGGElement,
		box: number[][]) {

	let $box = _bez_debug_.fs.draw.polygon(
		g, box, 'thin5 black nofill'
	);

	return $box;
}
	

let drawElemFunctions: IDrawElemFunctions = {
	beziers,
	intersection,
	extreme,
	boundingHull,
	looseBoundingBox,
	tightBoundingBox,
	fatLine
}


export { drawElemFunctions };
