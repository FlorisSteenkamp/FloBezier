declare function getDistanceToLineFunction(pS: number[], pE: number[]): (p: number[], _p: number[]) => {
    dMin: number;
    dMax: number;
};
export { getDistanceToLineFunction };
