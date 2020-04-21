
import { getCurvatureExtremaBrackets } from "../get-curvature-extrema/get-curvature-extrema-brackets";


function getInflections(ps: number[][]) {
    return getCurvatureExtremaBrackets(ps).inflections;
}


export { getInflections }
