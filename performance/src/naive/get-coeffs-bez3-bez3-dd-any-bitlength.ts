import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";
import { getXYDdAnyBitlength3 as _getXYDdAnyBitlength3 } from './get-xy-dd-any-bitlength';
import { getImplicitForm3DdAnyBitlength as _getImplicitForm3DdAnyBitlength } from './get-implicit-form3-dd-any-bitlength';


const getXYDdAnyBitlength3 = _getXYDdAnyBitlength3;
const getImplicitForm3DdAnyBitlength = _getImplicitForm3DdAnyBitlength;

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qm2 = ddMultBy2;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qaq = ddAddDd;

/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of 2 order 
 * 3 bezier curves (i.e. 2 cubic bezier curves).
 * 
 * The returned polynomial degree will be 9
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** none
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound (which is approximately 
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc
 */
function getCoeffsBez3Bez3DdAnyBitlength(
        ps1: number[][], 
        ps2: number[][]) {

    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } 
        = getImplicitForm3DdAnyBitlength(ps1);

    const cd = getXYDdAnyBitlength3(ps2);
    const c = cd[0];
    const d = cd[1];
    const c3 = c[0];
    const c2 = c[1];
    const c1 = c[2];
    const c0 = c[3];
    const d3 = d[0];
    const d2 = d[1];
    const d1 = d[2];
    const d0 = d[3];

    
    const c0c0 = tp(c0,c0);  // error free
    const c0c1 = qmd(c0,c1);
    const c0c2 = qmd(c0,c2);
    const c0c3 = qmd(c0,c3);
    const c0d0 = tp(c0,d0);  // error free
    const c0d1 = qmd(c0,d1);
    const c0d2 = qmd(c0,d2);
    const c0d3 = qmd(c0,d3);
    const c1c1 = qmq(c1,c1);
    const c1c2 = qmq(c1,c2);
    const c1c3 = qmq(c1,c3);
    const c1d0 = qmd(d0,c1);
    const c1d1 = qmq(c1,d1);
    const c1d2 = qmq(c1,d2);
    const c1d3 = qmq(c1,d3);
    const c2d1 = qmq(c2,d1);
    const c2c2 = qmq(c2,c2);    
    const c2c3 = qmq(c2,c3);
    const c2d0 = qmd(d0,c2);
    const c2d2 = qmq(c2,d2);
    const c2d3 = qmq(c2,d3);
    const c3c3 = qmq(c3,c3);
    const c3d0 = qmd(d0,c3);
    const c3d1 = qmq(c3,d1);
    const c3d2 = qmq(c3,d2);
    const c3d3 = qmq(c3,d3);

    
    const d0d0 = tp(d0,d0);  // error free
    const d0d1 = qmd(d0,d1);
    const d0d2 = qmd(d0,d2);
    const d0d3 = qmd(d0,d3);
    const d1d1 = qmq(d1,d1);
    const d1d2 = qmq(d1,d2);
    const d3d3 = qmq(d3,d3);
    const d2d2 = qmq(d2,d2);
    const d2d3 = qmq(d2,d3);
    const d1d3 = qmq(d1,d3);

    //-----------------------
    //const v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;
    //-----------------------
    const v9 = qaq(
        qaq(
            qmq(qmq(c3,c3c3),vₓₓₓ), 
            qmq(qmq(c3,d3d3),vₓᵧᵧ)
        ),
        qaq(
            qmq(qmq(d3,c3c3),vₓₓᵧ), 
            qmq(qmq(d3,d3d3),vᵧᵧᵧ)
        )
    );


    //-----------------------
    //const v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    //-----------------------
    const v8 = qaq(
        qaq(
            qmq(vₓₓᵧ,qmq(c3,qaq(qm2(c2d3),c3d2))),
            qmq(vₓᵧᵧ,qmq(d3,qaq(qm2(c3d2),c2d3)))
        ),
        qmd(
            3,
            qaq(
                qmq(vₓₓₓ,qmq(c2,c3c3)),
                qmq(vᵧᵧᵧ,qmq(d2,d3d3))
            )
        )
    );


    const wc = qaq(c1c3,c2c2);
    const wd = qaq(d1d3,d2d2);
    //-----------------------
    //const v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    //-----------------------
    const v7 = qaq(
        qaq(
            qmq(vₓₓᵧ, qaq(
                qm2(qaq(qmq(c1,c3d3),qmq(c2,c3d2))),
                qaq(qmq(d1,c3c3),qmq(d3,c2c2))
            )),
            qmq(vₓᵧᵧ, qaq(
                qm2(qaq(qmq(c2,d2d3),qmq(c3,d1d3))),
                qaq(qmq(c1,d3d3),qmq(d2,c3d2))
            ))
        ),
        qmd(
            3,
            qaq(
                qmq(vₓₓₓ,qmq(c3,wc)),
                qmq(vᵧᵧᵧ,qmq(d3,wd))
            )
        )
    );


    const wo = qaq(c2d3,c3d2);
    //const v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    const v6 = qaq(
        qaq(
            qaq(
                qmq(vₓₓᵧ,qaq(
                    qaq(
                        qmq(d2,c2c2),
                        qm2(qmq(c1,wo))
                    ),
                    qmq(
                        c3,
                        qaq(qm2(qaq(c0d3,c2d1)),c3d0)
                    )
                )),
                qmq(vₓᵧᵧ,qaq(
                    qaq(
                        qmq(c2,d2d2),
                        qm2(qmq(d1,wo))
                    ),
                    qmq(
                        d3,
                        qaq(qm2(qaq(c1d2,c3d0)),c0d3)
                    )
                ))
            ),
            qaq(
                qmq(vₓₓₓ,qaq(qmq(c2,c2c2),qmq(qmd(3,c3),qaq(qm2(c1c2),c0c3)))),
                qmq(vᵧᵧᵧ,qaq(qmq(d2,d2d2),qmq(qmd(3,d3),qaq(qm2(d1d2),d0d3))))
            )
        ),
        qaq(
            qaq(
                qmq(c3c3,vₓₓ),
                qmq(d3d3,vᵧᵧ)
            ),
            qmq(c3d3,vₓᵧ)
        )
    );


    //const r4 = c2d2 + c3d1;
    const r4 = qaq(c2d2,c3d1);
    //const v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    const v5 = qaq(
        qaq(
            qaq(
                qmq(vₓₓᵧ,qaq(
                    qaq(
                        qm2(qaq(qmd(c0,wo),
                        qmq(c1,r4))),qmq(d3,c1c1)
                    ),
                    qmq(c2,qaq(qm2(c3d0),c2d1))
                )),
                qmq(vₓᵧᵧ,qaq(
                    qaq(
                        qm2(qaq(qmd(d0,wo), qmq(d1,qaq(c1d3,c2d2)))),
                        qmq(c3,d1d1)
                    ),
                    qmq(d2,qaq(qm2(c0d3),c1d2))
                ))
            ),
            qmd(3,qaq(
                qmq(vₓₓₓ,qaq(qm2(qmd(c0,c2c3)),qmq(c1,wc))),
                qmq(vᵧᵧᵧ,qaq(qm2(qmd(d0,d2d3)),qmq(d1,wd)))
            ))
        ),
        qaq(
            qmq(
                vₓᵧ,
                wo
            ),
            qm2(qaq(
                qmq(c2c3,vₓₓ),
                qmq(d2d3,vᵧᵧ)
            ))
        )
    );
    
    
    //const r1 = c1d3 + r4;
    //const r2 = 2*c1c3 + c2c2;
    //const r3 = 2*d1d3 + d2d2;
    const r1 = qaq(c1d3,r4);
    const r2 = qaq(qm2(c1c3),c2c2);
    const r3 = qaq(qm2(d1d3),d2d2);
    //const v4 =
    //    vₓₓᵧ*(2*c0*r1 + d0*r2 + c1*(c1d2 + 2*c2d1)) +
    //    vₓᵧᵧ*(2*d0*r1 + c0*r3 + d1*(c2d1 + 2*c1d2)) +
    //    vₓₓₓ*3*(c0*r2 + c2*c1c1) +
    //    vᵧᵧᵧ*3*(d0*r3 + d2*d1d1) +
    //    vₓᵧ*r1 +
    //    vₓₓ*r2 +
    //    vᵧᵧ*r3;
    const v4 = qaq(
        qaq(
            qaq(
                qmq(vₓₓᵧ,qaq(qaq(qmd(2*c0,r1),qmd(d0,r2)),qmq(c1,qaq(c1d2,qm2(c2d1))))),
                qmq(vₓᵧᵧ,qaq(qaq(qmd(2*d0,r1),qmd(c0,r3)),qmq(d1,qaq(c2d1,qm2(c1d2)))))
            ),
            qmd(3,qaq(
                qmq(vₓₓₓ,qaq(qmd(c0,r2),qmq(c2,c1c1))),
                qmq(vᵧᵧᵧ,qaq(qmd(d0,r3),qmq(d2,d1d1)))
            ))
        ),
        qaq(
            qaq(
                qmq(vₓᵧ,r1),
                qmq(vₓₓ,r2)
            ),
            qmq(vᵧᵧ,r3)
        )
    );


    //const r6 = c1d2 + c2d1;
    //const r7 = c3d0 + c0d3;
    //const r8 = c1c2 + c0c3;
    //const r9 = d1d2 + d0d3;
    const r6 = qaq(c1d2,c2d1);
    const r7 = qaq(c3d0,c0d3);
    const r8 = qaq(c1c2,c0c3);
    const r9 = qaq(d1d2,d0d3);
    //const v3 =
    //    vₓₓᵧ*(c0*(2*r6 + c3d0 + r7) + c1*(2*c2d0 + c1d1)) +
    //    vₓᵧᵧ*(d0*(2*r6 + c0d3 + r7) + d1*(2*c0d2 + c1d1)) +
    //    vₓₓₓ*(3*c0*(r8 + c1c2) + c1*c1c1) + 
    //    vᵧᵧᵧ*(3*d0*(r9 + d1d2) + d1*d1d1) +
    //    vₓᵧ*(r7 + r6) +
    //    2*(vₓₓ*r8 + vᵧᵧ*r9) +
    //    vₓ*c3 + vᵧ*d3;
    const v3 = qaq(
        qaq(
            qaq(
                qmq(vₓₓᵧ,qaq(
                    qmd(c0,qaq(qaq(qm2(r6),c3d0),r7)),
                    qmq(c1,qaq(qm2(c2d0),c1d1))
                )),
                qmq(vₓᵧᵧ,qaq(
                    qmd(d0,qaq(qaq(qm2(r6),c0d3),r7)),
                    qmq(d1,qaq(qm2(c0d2),c1d1))
                ))
            ),
            qaq(
                qmq(vₓₓₓ,qaq(
                    qmq(tp(3,c0),qaq(r8,c1c2)),
                    qmq(c1,c1c1)
                )),
                qmq(vᵧᵧᵧ,qaq(
                    qmq(tp(3,d0),qaq(r9,d1d2)),
                    qmq(d1,d1d1)
                ))
            )
        ),
        qaq(
            qaq(
                qmq(vₓᵧ,qaq(
                    r7,
                    r6
                )),
                qm2(qaq(
                    qmq(vₓₓ,r8),
                    qmq(vᵧᵧ,r9)
                ))
            ),
            qaq(
                qmq(c3,vₓ),
                qmq(d3,vᵧ)
            )
        )
    );


    //const ra = c1d1 + c2d0;
    const ra = qaq(c1d1,c2d0);
    //const rb = c1d1 + c0d2;
    //const v2 =
    //    vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
    //    vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
    //    3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
    //    3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
    //    vₓᵧ*(ra + c0d2) +
    //    vₓₓ*(2*c0c2 + c1c1) + 
    //    vᵧᵧ*(2*d0d2 + d1d1) +
    //    c2*vₓ + d2*vᵧ;
    const v2 = qaq(
        qaq(
            qaq(
                qmq(vₓₓᵧ,qaq(
                    qmd(c0,qaq(qm2(ra),c0d2)),
                    qmd(d0,c1c1)
                )),
                qmq(vₓᵧᵧ,qaq(
                    qmd(d0,qaq(qm2(qaq(c1d1,c0d2)),c2d0)),
                    qmd(c0,d1d1)
                ))
            ),
            qaq(
                qmd(3,qaq(
                    qmq(vₓₓₓ,qaq(
                        qmd(c0,c1c1),
                        qmq(c2,c0c0)
                    )),
                    qmq(vᵧᵧᵧ,qaq(
                        qmd(d0,d1d1),
                        qmq(d2,d0d0)
                    ))
                )),
                qmq(vₓᵧ,qaq(ra,c0d2))
            )
        ),
        qaq(
            qaq(
                qmq(vₓₓ,qaq(qm2(c0c2),c1c1)),
                qmq(vᵧᵧ,qaq(qm2(d0d2),d1d1))
            ),
            qaq(
                qmq(c2,vₓ),
                qmq(d2,vᵧ)
            )
        )
    );


    //const rc = c1d0 + c0d1;
    const rc = qaq(c1d0,c0d1);
    //const v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    const v1 = qaq(
        qaq(
            qaq(
                qmq(
                    qmd(c0,vₓₓᵧ),
                    qaq(rc,c1d0)
                ),
                qmq(
                    qmd(d0,vₓᵧᵧ),
                    qaq(rc,c0d1)
                )
            ),
            qmd(3,qaq(
                qmq(qmq(c1,c0c0),vₓₓₓ),
                qmq(qmq(d1,d0d0),vᵧᵧᵧ)
            ))
        ),
        qaq(
            qaq(
                qmq(vₓᵧ,rc),
                qm2(qaq(
                    qmq(c0c1,vₓₓ),
                    qmq(d0d1,vᵧᵧ)
                ))
            ),
            qaq(
                qmq(c1,vₓ),
                qmq(d1,vᵧ)
            )
        )
    );


    //-----
    // v0
    //-----
    const v0 = qaq(
        qaq(
            qaq(
                qaq(
                    qmq(c0c0,qaq(qaq(
                        qmd(c0,vₓₓₓ),
                        qmd(d0,vₓₓᵧ)
                    ),vₓₓ)),
                    qmq(d0d0,qaq(qaq(
                        qmd(c0,vₓᵧᵧ),
                        qmd(d0,vᵧᵧᵧ)
                    ),vᵧᵧ))
                ),
                qmq(c0d0,vₓᵧ)
            ),
            qaq(
                qmd(c0,vₓ),
                qmd(d0,vᵧ)
            )
        ),
        v
    );


    return [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffsBez3Bez3DdAnyBitlength }


    /*
    const v9 =  
        qaq(
            qaq(
                qmq(qmd(c3,c3c3),vₓₓₓ),
                qmq(qmd(c3,d3d3),vₓᵧᵧ)
            ),
            qaq(
                qmq(qmd(d3,c3c3),vₓₓᵧ),
                qmq(qmd(d3,d3d3),vᵧᵧᵧ)
            )
        );
    */
