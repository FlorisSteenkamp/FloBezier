// From https://github.com/nl253/PSO


//const { EventEmitter } = require('events');

function emit(...args: any) {
    console.log(...args)
}

interface Options {
    maxPos: number,
    maxVel: number,
    minPos: number,
    minVel: number,
    nNeighs: number,
    nParts: number,
    nRounds: number,
    nTrack: number,
    timeoutMillis: number,
}

const defaults: Options = {
    minPos: -1e3,
    maxPos: 1e3,
    minVel: -1e3,
    maxVel: 1e3,

    nNeighs: 0.5,
    nParts: 300,
    nRounds: 1E6,
    nTrack: 50,
    timeoutMillis: 5_000,
};


/**
 * @param f
 * @param nDims
 * @param opts
 */
function * psoSearch(
        f: (arr: Float64Array) => number, 
        nDims: number, 
        options: Partial<Options> = {}) {

    const opts = { ...defaults, ...options };
    
    const { nParts } = opts;
    let { nNeighs } = opts;

    // 0.2 is 20%, 10 is 10
    if (nNeighs < 1) {
        nNeighs = Math.floor(nParts * nNeighs);
    }

    //console.log(opts)

    let rIdx = 0;
    const offsetSize = 3*nDims;

    // indexes of all particles sorted on every iteration
    const indexes = new Uint16Array(new ArrayBuffer(2 * nParts)).map((_, idx) => idx);

    // indexes of all particles computed on every iteration
    const distances = new Float64Array(new ArrayBuffer(8 * nParts));

    // scores of candidates from last nTrack rounds
    const scores = new Float64Array(new ArrayBuffer(8 * opts.nTrack));

    // in this algorithm score cache is extremely useful, you are requesting 
    // the score of the same particles over and over again
    const cachePos = new Map();
    const cacheBest = new Map();

    //emit('generate');

    const swarm = new Float64Array(
        new ArrayBuffer(8 * 3 * nParts * nDims)
    );

    //emit('randomize');

    // initialise swarm to rand values
    for (let i=0; i<swarm.length; i++) {
        swarm[i] = Math.random() * (Math.random() < 0.5 ? opts.maxPos : opts.minPos);
    }

    const startTm = Date.now();

    // history of highest fitness values
    // used to detect if the algorithm is stuck
    const histMax = new Float64Array(new ArrayBuffer(8 * opts.nTrack));
    // this is a hack (ensures that enough history entries are present)
    histMax[histMax.length - 1] = Infinity;

    let timeTaken;

    while (true) {
        timeTaken = Date.now() - startTm;

        // stop conditions
        if (rIdx >= opts.nRounds) {
            emit('rounds');
            break;
        } else if (timeTaken >= opts.timeoutMillis) {
            emit('timeout', timeTaken);
            break;
        } else {
            histMax.set(histMax.subarray(1));
            histMax[histMax.length - 1] = scores.reduce((s1, s2) => Math.max(s1, s2));
            if (!histMax.some(max => max !== histMax[0])) {
                emit('stuck');
                break;
            }
        }

        rIdx++;

        // decrease inertia linearly with time
        const weight = (1 - (timeTaken / opts.timeoutMillis));
        //emit('inertia', weight);

        for (let i=0; i<nParts; i++) {
            let scoreParticle = cachePos.get(i);
            const offsetPos = i * offsetSize;
            const offsetBest = offsetPos + nDims;
            const offsetVel = offsetBest + nDims;

            if (scoreParticle === undefined) {
                scoreParticle = f(swarm.subarray(offsetPos, offsetBest));
                // protect against fitness function returning NaN or Infinity
                if (Object.is(NaN, scoreParticle)) {
                    console.warn('[WARN] fitness function returned NaN');
                    scoreParticle = -Infinity;
                }
                cachePos.set(i, scoreParticle);
            }

            let scoreBestKnown = cacheBest.get(i);

            if (scoreBestKnown === undefined) {
                scoreBestKnown = f(swarm.subarray(offsetBest, offsetVel));
                cacheBest.set(i, scoreBestKnown);
            }

            if (scoreParticle > scoreBestKnown) {
                cacheBest.set(i, scoreParticle);
                for (let j=0; j<nDims; j++) {
                    swarm[offsetBest + j] = swarm[offsetPos + j];
                }
            }

            // get neighbours
            for (let nIdx=0; nIdx<nParts; nIdx++) {
                distances[nIdx] = 0;
                const offsetPosN = nIdx * offsetSize;
                for (let j = 0; j < nDims; j++) {
                    distances[nIdx] += Math.abs(swarm[offsetPos + j] - swarm[offsetPosN + j]);
                }
            }

            // the 0th item will be self which has a distance of 0 (not useful)
            const neighbourIdxs = indexes.sort((a, b) => (distances[a] > distances[b] ? 1 : -1)).subarray(1, nNeighs + 1);

            // assume the first neighbour is the best
            let bestNeighIdx = neighbourIdxs[0];
            let bestScore = cachePos.get(bestNeighIdx);

            if (bestScore === undefined) {
                bestScore = f(swarm.subarray(bestNeighIdx * offsetSize, bestNeighIdx * offsetSize + nDims));
                cachePos.set(bestNeighIdx, bestScore);
            }

            for (let i = 1; i < neighbourIdxs.length; i++) {
                const nIdx = neighbourIdxs[i];
                let score = cachePos.get(nIdx);

                if (score === undefined) {
                    score = f(swarm.subarray(nIdx * offsetSize, nIdx * offsetSize + nDims));
                    cachePos.set(nIdx, score);
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestNeighIdx = nIdx;
                }
            }
            // emit('best',
            //     bestScore,
            //     bestScore - scores[scores.length - 1], // improvement
            //     bestNeighIdx,
            // );

            // shift scores
            scores.set(scores.subarray(1));
            scores[scores.length - 1] = bestScore;

            const offsetPosFittestNeigh = bestNeighIdx * offsetSize;
            for (let dim = 0; dim < nDims; dim++) {
                const particlePos = swarm[offsetPos + dim];
                swarm[offsetVel + dim] = Math.max(
                    opts.minVel,
                    Math.min(
                        opts.maxVel,
                        weight*swarm[offsetVel + dim] + 
                            Math.random()*(swarm[offsetBest + dim] - particlePos) + 
                            Math.random()*(swarm[offsetPosFittestNeigh + dim] - particlePos),
                    ),
                );
            }
            cachePos.delete(i);
            for (let dim = 0; dim < nDims; dim++) {
                swarm[offsetPos + dim] = Math.min(
                    opts.maxPos, 
                    Math.max(
                        opts.minPos, 
                        swarm[offsetPos + dim] + swarm[offsetVel + dim]
                    )
                );
            }
        }
    }

    ///for (let pIdx = 0; pIdx < nParts; pIdx++) {
    for (let pIdx = 0; pIdx < 5; pIdx++) {
        // yield best known
        yield swarm.subarray(pIdx * offsetSize + nDims, pIdx * offsetSize + nDims + nDims);
    }
}


export { psoSearch }
