import { expect } from "chai";
function checkResults(ds, total) {
    let sum = 0;
    let max = 0;
    for (const d of ds) {
        sum += d;
        if (d > max) {
            max = d;
        }
    }
    const mean = sum / total;
    let sumSquaredDiffs = 0;
    for (const d of ds) {
        sumSquaredDiffs += (mean - d) ** 2;
    }
    const stdDev = Math.sqrt(sumSquaredDiffs / total);
    // accuracy to be to within one billionth of the max coordinate
    expect(max).to.be.lessThan(1e-9);
    //'xs: ' + total;//?
    //'max: ' + max;//?
    //'max/eps: ' + max/eps;//?
    //'mean: ' + mean;//?
    //'stdDev: ' + stdDev;//?
}
export { checkResults };
//# sourceMappingURL=check-results.js.map