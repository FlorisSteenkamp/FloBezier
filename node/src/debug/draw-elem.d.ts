export interface IDrawElemFunctions {
    drawBezier: (g: SVGGElement, beziers: number[][], idx: number, visible?: boolean) => SVGElement[];
    drawIntersection: (g: SVGGElement, p: number[], size: number, visible?: boolean) => SVGElement[];
    drawExtreme: (g: SVGGElement, extreme: {
        p: number[];
        t: number;
    }, visible?: boolean) => SVGElement[];
    drawLooseBoundingBox: (g: SVGGElement, box: number[][], visible?: boolean) => SVGElement[];
    drawTightBoundingBox: (g: SVGGElement, box: number[][], visible?: boolean) => SVGElement[];
    drawBoundingHull: (g: SVGGElement, hull: number[][], visible?: boolean, style?: string) => SVGElement[];
}
declare let drawElemFunctions: IDrawElemFunctions;
export { drawElemFunctions };
