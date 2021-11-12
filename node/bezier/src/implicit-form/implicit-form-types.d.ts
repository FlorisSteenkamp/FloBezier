/** linear bezier curve implicit form coefficients */
interface ImplicitForm1Coeffs<T> {
    vₓ: T;
    vᵧ: T;
    v: T;
}
/** quadratic bezier curve implicit form coefficients */
interface ImplicitForm2Coeffs<T> extends ImplicitForm1Coeffs<T> {
    vₓₓ: T;
    vₓᵧ: T;
    vᵧᵧ: T;
}
/** cubic bezier curve implicit form coefficients */
interface ImplicitForm3Coeffs<T> extends ImplicitForm2Coeffs<T> {
    vₓₓₓ: T;
    vₓₓᵧ: T;
    vₓᵧᵧ: T;
    vᵧᵧᵧ: T;
}
/** linear bezier curve implicit form coefficient errors */
interface ImplicitForm1CoeffErrors {
    vₓ_: number;
    vᵧ_: number;
    v_: number;
}
/** quadratic bezier curve implicit form coefficients */
interface ImplicitForm2CoeffErrors extends ImplicitForm1CoeffErrors {
    vₓₓ_: number;
    vₓᵧ_: number;
    vᵧᵧ_: number;
}
/** cubic bezier curve implicit form coefficients */
interface ImplicitForm3CoeffErrors extends ImplicitForm2CoeffErrors {
    vₓₓₓ_: number;
    vₓₓᵧ_: number;
    vₓᵧᵧ_: number;
    vᵧᵧᵧ_: number;
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
declare type ImplicitForm<T> = ImplicitForm1<T> | ImplicitForm2<T> | ImplicitForm3<T>;
declare type ImplicitFormDouble = ImplicitForm<number>;
declare type ImplicitFormDd = ImplicitForm<number[]>;
declare type ImplicitFormExact1 = ImplicitForm1Coeffs<number[]>;
declare type ImplicitFormExact2 = ImplicitForm2Coeffs<number[]>;
declare type ImplicitFormExact3 = ImplicitForm3Coeffs<number[]>;
declare type ImplicitFormExact = ImplicitFormExact1 | ImplicitFormExact2 | ImplicitFormExact3;
export { ImplicitForm1, ImplicitForm2, ImplicitForm3, ImplicitForm, ImplicitFormDd, ImplicitFormDouble, ImplicitForm1Coeffs, ImplicitForm2Coeffs, ImplicitForm3Coeffs, ImplicitForm1CoeffErrors, ImplicitForm2CoeffErrors, ImplicitForm3CoeffErrors, ImplicitFormExact1, ImplicitFormExact2, ImplicitFormExact3, ImplicitFormExact };