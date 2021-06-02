// the below was in test()


    //---- Compare self intersections ----//
    /*
    {
        let maxDiff = 0;
        for (let i=0; i<10_000; i++) {
            const curve1 = curves[i];
            const tsPaper = curve1.getIntersections(curve1);

            const ps1 = pss[i];
            const tsNative = bezierSelfIntersection(ps1);

            if (tsNative && tsNative.length > 0 || tsPaper.length > 0) {
                //console.log('----');
                //console.log('native', tsNative);
                if (tsPaper.length) {
                    const t1 = tsPaper[0].time;
                    const t2 = tsPaper[0].intersection.time;
                    //console.log('paper', { t1, t2 });

                    let t1Diff = Math.abs(tsNative[0] - t1);
                    let t2Diff = Math.abs(tsNative[1] - t2);
                    let t1DiffR = Math.abs(tsNative[0] - t2);
                    let t2DiffR = Math.abs(tsNative[1] - t1);
                    if (t1Diff < t1DiffR) {
                        if (t1Diff > Number.EPSILON * 2*2) {
                            //console.log('d1', t1Diff)
                            //console.log('d2', t2Diff)
                            if (t1Diff > maxDiff) { maxDiff = t1Diff }
                        }
                    } else {
                        if (t1Diff > Number.EPSILON * 2*2) {
                            //console.log('d1', t1DiffR)
                            //console.log('d2', t2DiffR)
                            if (t1DiffR > maxDiff) { maxDiff = t1DiffR }
                        }
                    }
                }
                //if (tsNative.length > 0) {
                //    // @ts-ignore
                //    console.log('paper', tsPaper[0].points);
                //}
            }
        }
        console.log(maxDiff);
    }*/
//}