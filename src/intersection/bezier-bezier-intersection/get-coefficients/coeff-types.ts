// import as `import type {CoeffDouble, ...}`

interface XCoeff<T> { 
    coeffs: T[];
    errBound: number[];
}

type CoeffDouble = XCoeff<number>;
type CoeffDd = XCoeff<number[]>;
type CoeffExact = number[][];


export { CoeffDouble, CoeffExact, CoeffDd }
