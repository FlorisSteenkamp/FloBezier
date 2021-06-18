// types only, import as `import type { ... } ...`

/** linear bezier curve implicit form coefficients */
interface Coeffs1<T> {
    vₓ   : T; vᵧ   : T;
    v    : T;
}


/** quadratic bezier curve implicit form coefficients */
interface Coeffs2<T> extends Coeffs1<T> {
    vₓₓ  : T; vₓᵧ  : T; vᵧᵧ  : T;
}


/** cubic bezier curve implicit form coefficients */
interface Coeffs3<T> extends Coeffs2<T> {
    vₓₓₓ : T; vₓₓᵧ : T; vₓᵧᵧ : T; vᵧᵧᵧ : T;
}


/** linear bezier curve implicit form coefficient errors */
interface CoeffErrors1 {
    vₓ_   : number; vᵧ_   : number;
    v_    : number;
}


/** quadratic bezier curve implicit form coefficients */
interface CoeffErrors2 extends CoeffErrors1 {
    vₓₓ_  : number; vₓᵧ_  : number; vᵧᵧ_  : number;
}


/** cubic bezier curve implicit form coefficients */
interface CoeffErrors3 extends CoeffErrors2 {
    vₓₓₓ_ : number; vₓₓᵧ_ : number; vₓᵧᵧ_ : number; vᵧᵧᵧ_ : number;
}


interface ImplicitForm1<T> { 
    coeffs: Coeffs1<T>;
    errorBound: CoeffErrors1;
}
interface ImplicitForm2<T> { 
    coeffs: Coeffs2<T>;
    errorBound: CoeffErrors2;
}
interface ImplicitForm3<T> { 
    coeffs: Coeffs3<T>;
    errorBound: CoeffErrors3;
}


type ImplicitForm<T> = 
    | ImplicitForm1<T> 
    | ImplicitForm2<T> 
    | ImplicitForm3<T>;

type ImplicitFormDouble = ImplicitForm<number>;
type ImplicitFormDd = ImplicitForm<number[]>;
type ImplicitFormExact1 = Coeffs1<number[]>;
type ImplicitFormExact2 = Coeffs2<number[]>;
type ImplicitFormExact3 = Coeffs3<number[]>;

type ImplicitFormExact = 
    | ImplicitFormExact1 
    | ImplicitFormExact2
    | ImplicitFormExact3;


//type CoeffKeys<T> = keyof Coeffs<T>;
//type CoeffErrorKeys<T> = keyof CoeffErrors<T>;

export { 
    ImplicitForm1, ImplicitForm2, ImplicitForm3, 
    ImplicitForm, ImplicitFormDd, ImplicitFormDouble,
    Coeffs1, Coeffs2, Coeffs3,
    CoeffErrors1, CoeffErrors2, CoeffErrors3,
    ImplicitFormExact1, ImplicitFormExact2, ImplicitFormExact3,
    ImplicitFormExact
}