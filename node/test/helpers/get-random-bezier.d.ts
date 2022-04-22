declare function getRandomBezier(maxCoordinate: number, significantBits: number): (order: 0 | 1 | 2 | 3) => (seed: number) => number[][];
declare const getRandomPoint: (seed: number) => number[][];
declare const getRandomLine: (seed: number) => number[][];
declare const getRandomQuad: (seed: number) => number[][];
declare const getRandomCubic: (seed: number) => number[][];
export { getRandomPoint, getRandomBezier, getRandomLine, getRandomQuad, getRandomCubic };
