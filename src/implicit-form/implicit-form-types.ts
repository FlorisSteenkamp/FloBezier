// types only, import as `import type { ... } ...`

/** linear bezier curve implicit form coefficients */
interface ImplicitForm1Coeffs<T> {
    vₓ   : T; vᵧ   : T;
    v    : T;
}


/** quadratic bezier curve implicit form coefficients */
interface ImplicitForm2Coeffs<T> extends ImplicitForm1Coeffs<T> {
    vₓₓ  : T; vₓᵧ  : T; vᵧᵧ  : T;
}


/** cubic bezier curve implicit form coefficients */
interface ImplicitForm3Coeffs<T> extends ImplicitForm2Coeffs<T> {
    vₓₓₓ : T; vₓₓᵧ : T; vₓᵧᵧ : T; vᵧᵧᵧ : T;
}


/** linear bezier curve implicit form coefficient errors */
interface ImplicitForm1CoeffErrors {
    vₓ_   : number; vᵧ_   : number;
    v_    : number;
}


/** quadratic bezier curve implicit form coefficients */
interface ImplicitForm2CoeffErrors extends ImplicitForm1CoeffErrors {
    vₓₓ_  : number; vₓᵧ_  : number; vᵧᵧ_  : number;
}


/** cubic bezier curve implicit form coefficients */
interface ImplicitForm3CoeffErrors extends ImplicitForm2CoeffErrors {
    vₓₓₓ_ : number; vₓₓᵧ_ : number; vₓᵧᵧ_ : number; vᵧᵧᵧ_ : number;
}


interface ImplicitForm1<T> { 
    coeffs: ImplicitForm1Coeffs<T>;
    errorBound: ImplicitForm1CoeffErrors;
}
interface ImplicitForm2<T> { 
    coeffs: ImplicitForm2Coeffs<T>;
    errorBound: ImplicitForm2CoeffErrors;
}
interface ImplicitForm3<T> { 
    coeffs: ImplicitForm3Coeffs<T>;
    errorBound: ImplicitForm3CoeffErrors;
}


type ImplicitForm<T> = 
    | ImplicitForm1<T> 
    | ImplicitForm2<T> 
    | ImplicitForm3<T>;

type ImplicitFormDouble = ImplicitForm<number>;
type ImplicitFormDd = ImplicitForm<number[]>;
type ImplicitFormExact1 = ImplicitForm1Coeffs<number[]>;
type ImplicitFormExact2 = ImplicitForm2Coeffs<number[]>;
type ImplicitFormExact3 = ImplicitForm3Coeffs<number[]>;

type ImplicitFormExact = 
    | ImplicitFormExact1 
    | ImplicitFormExact2
    | ImplicitFormExact3;


//type CoeffKeys<T> = keyof Coeffs<T>;
//type CoeffErrorKeys<T> = keyof CoeffErrors<T>;

export { 
    ImplicitForm1, ImplicitForm2, ImplicitForm3, 
    ImplicitForm, ImplicitFormDd, ImplicitFormDouble,
    ImplicitForm1Coeffs, ImplicitForm2Coeffs, ImplicitForm3Coeffs,
    ImplicitForm1CoeffErrors, ImplicitForm2CoeffErrors, ImplicitForm3CoeffErrors,
    ImplicitFormExact1, ImplicitFormExact2, ImplicitFormExact3,
    ImplicitFormExact
}