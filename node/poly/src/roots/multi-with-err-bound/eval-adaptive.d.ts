declare function evalAdaptive(p: number[][], pE: number[], x: number, psExact: {
    ps: number[][][];
}, getPsExact: () => number[][][], diffCount: number): number;
export { evalAdaptive };
