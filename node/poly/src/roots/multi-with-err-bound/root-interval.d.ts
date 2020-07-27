declare type RootInterval = {
    /** the minimum possible t-value */
    tS: number;
    /** the maximum possible t-value */
    tE: number;
    /** really just the parity of the multiplicity - even or odd */
    multiplicity: number;
};
declare function createRootExact(t: number): RootInterval;
declare function mid(ri: RootInterval): number;
export { RootInterval, createRootExact, mid };
