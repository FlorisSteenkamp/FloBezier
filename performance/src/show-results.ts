
function showResults(
        method: string,
        timingOnly: boolean,
        timing: number,
        ds: number[],
        total: number) {

    if (!timingOnly) {
        let sum = 0;
        let max = 0;
        for (const d of ds) {
            sum += d;
            if (d > max) { max = d; }
        }
        const mean = sum / total;
        let sumSquaredDiffs = 0;
        for (const d of ds) {
            sumSquaredDiffs += (mean - d)**2;
        }
        const stdDev = Math.sqrt(sumSquaredDiffs / total);

        console.log('');
        console.log('-------------------------');
        console.log(method);
        console.log('-------------------------');
        //console.log('millis: ' + timing.toFixed(3));
        console.log('xs: ' + total);
        console.log('max: ' + max);
        console.log('max/eps: ' + max/Number.EPSILON);
        console.log('mean: ' + mean);
        console.log('stdDev: ' + stdDev);
    } else {
        console.log('-------------------------');
        console.log(method);
        console.log('-------------------------');
        console.log('xs: ' + total);
        console.log('millis: ' + timing.toFixed(3));
    }
}


export { showResults }
