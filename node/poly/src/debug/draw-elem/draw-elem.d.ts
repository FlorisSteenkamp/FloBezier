import { DebugElemType } from '../debug';
export declare type TDrawElemFunctions = {
    [T in DebugElemType]: (g: SVGGElement, elem: any) => SVGElement[];
};
export interface IDrawElemFunctions extends TDrawElemFunctions {
    testPoint: (g: SVGGElement, p: number[]) => SVGElement[];
}
declare let drawElemFunctions: IDrawElemFunctions;
export { drawElemFunctions };
