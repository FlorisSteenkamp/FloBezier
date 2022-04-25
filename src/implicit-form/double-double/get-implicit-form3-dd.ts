import { ddNegativeOf, ddMultBy2, ddMultDouble2, ddMultDd, ddDiffDd, ddAddDd, ddDivBy2} from 'double-double';
import { toPowerBasis3Dd } from '../../to-power-basis/to-power-basis/double-double/to-power-basis-dd.js';

const qno = ddNegativeOf;    // error -> 0
const qm2 = ddMultBy2;       // error -> 0 
const qd2 = ddDivBy2;        // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const qmd = ddMultDouble2;   // error -> 3*γ²
const qmq = ddMultDd;      // error -> 5*γ² (worst found), 7*γ² (theoretical), we use 6*γ²
const qdq = ddDiffDd;      // error -> 3*γ²
const qaq = ddAddDd;       // error -> 3*γ²


/**
 * Returns a double-double precision implicit form of the given cubic bezier 
 * curve.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps
 * 
 * @doc mdx
 */
function getImplicitForm3Dd(ps: number[][]) {
    // Takes about 15 micro-seconds on a 3rd gen i7 and Chrome 79.

    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    const [[a3,a2,a1,[,a0]],[b3,b2,b1,[,b0]]] = toPowerBasis3Dd(ps);

    const a3b1 = qmq(a3,b1);
    const a1b3 = qmq(a1,b3);
    const a3b2 = qmq(a3,b2);
    const a2b3 = qmq(a2,b3);
    const a3a3 = qmq(a3,a3);
    const b3b3 = qmq(b3,b3);

    const q1 = qdq(qmd(b0,a3),qmd(a0,b3));
    const q2 = qdq(a3b1,a1b3);
    const q3 = qdq(a3b2,a2b3);
    const q4 = qdq(qmd(b0,a2),qmd(a0,b2));
    const q5 = qdq(qmq(a2,b1),qmq(a1,b2));
    const q6 = qdq(qmd(b0,a1),qmd(a0,b1));
    const tq2 = qm2(q2);

    const q1q1  = qmq(q1,q1);
    const q1q5  = qmq(q1,q5);
    const tq2q4 = qmq(tq2,q4);
    const q3q4  = qmq(q3,q4);

    const u1 = qdq(qmd(-3,q1), q5);

    const vₓₓₓ = qmq(qno(b3),b3b3);
    const vₓₓᵧ  = qmq(qmd(3,a3),b3b3);
    const vₓᵧᵧ  = qmq(qmd(-3,b3),a3a3);
    const vᵧᵧᵧ =  qmq(a3,a3a3);
    const vₓₓ = qaq(
        qaq(
            qmq(u1,b3b3),
            qmq(q3,qdq(qmq(b1,b3),qmq(b2,b2)))
        ), 
        qmq(tq2,qmq(b2,b3))
    );
    const vᵧᵧ = qaq(
        qaq(
            qmq(u1,a3a3),
            qmq(q3,qdq(qmq(a1,a3),qmq(a2,a2)))
        ),
        qmq(tq2,qmq(a2,a3))
    );
    //-------------------------------------------------------
    // const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    //-------------------------------------------------------
    const vₓᵧ = qm2(
        qdq(
            qmq(q3,qdq(qmq(a2,b2),qd2(qaq(a1b3,a3b1)))),
            qaq(qmq(u1,qmq(a3,b3)),qmq(q2,qaq(a2b3,a3b2)))
        )
    );


    //------------------------------------------------
    // const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    //------------------------------------------------
    const s1 = qaq(
        qdq(qmd(-3,q1q1),qm2(q1q5)),
        qaq(tq2q4,qmq(q3,q6))
    );
    //-----------------------------
    // const s2 = 2*(q1q2 - q3q4);
    //-----------------------------
    const s2 = qm2(qdq(qmq(q1,q2),q3q4));
    //-------------------------------
    // const s3 = q1q3 - q2q2 + q3q5;
    //-------------------------------
    const s3 = qaq(qdq(qmq(q1,q3),qmq(q2,q2)),qmq(q3,q5));

    //-------------------------------
    // const vₓ = b3*s1 + (b2*s2 + b1*s3);
    //-------------------------------
    const vₓ = qaq(
        qmq(b3,s1),
        qaq(qmq(b2,s2),qmq(b1,s3))
    );
    //-------------------------------------
    // const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    //-------------------------------------
    const vᵧ = qno(
        qaq(qmq(a3,s1),
        qaq(qmq(a2,s2),qmq(a1,s3)))
    );
    //-------------------------------------------------------
    // const v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    //-------------------------------------------------------
    const v = qaq(
        qmq(q1,qdq(qdq(tq2q4,q1q1),q1q5)),
        qdq(qmq(s3,q6),qmq(q3q4,q4))
    );

        
    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm3Dd }
