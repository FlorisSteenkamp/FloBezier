import { DebugElemType } from '../debug';
export declare type TDrawElemFunctions = {
    [T in DebugElemType]: (g: SVGGElement, elem: any) => SVGElement[];
};
export interface IDrawElemFunctions extends TDrawElemFunctions {
    beziers: (g: SVGGElement, beziers: number[][][]) => SVGElement[];
    intersection: (g: SVGGElement, p: number[]) => SVGElement[];
    extreme: (g: SVGGElement, extreme: {
        p: number[];
        t: number;
    }) => SVGElement[];
    looseBoundingBox: (g: SVGGElement, box: number[][]) => SVGElement[];
    tightBoundingBox: (g: SVGGElement, box: number[][]) => SVGElement[];
    boundingHull: (g: SVGGElement, hull: number[][]) => SVGElement[];
    fatLine: (g: SVGGElement, fatLine: {
        l: number[][];
        minD: number;
        maxD: number;
    }) => SVGElement[];
}
declare let drawElemFunctions: IDrawElemFunctions;
export { drawElemFunctions };
