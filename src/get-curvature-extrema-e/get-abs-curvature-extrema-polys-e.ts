import { eMultBy2, eMultDouble1, eMult, eAdd, eDiff } from "big-float-ts";
import { toPowerBasis_1stDerivativeExact } from "../to-power-basis/to-power-basis-1st-derivative/exact/to-power-basis-1st-derivative-exact.js";
import { toPowerBasis_2ndDerivativeExact } from "../to-power-basis/to-power-basis-2nd-derivative/exact/to-power-basis-2nd-derivative-exact.js";
import { toPowerBasis_3rdDerivativeExact } from "../to-power-basis/to-power-basis-3rd-derivative/exact/to-power-basis-3rd-derivative-exact.js";


// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const em2 = eMultBy2;
const em4 = (v: number[]) => eMultBy2(eMultBy2(v));
const emd = eMultDouble1;
const eme = eMult;
const eae = eAdd;
const ede = eDiff;


/**
 * Returns the polynomials whose zeros are the `t` values of the local 
 * minima / maxima of the absolute curvature for the given bezier curve. 
 * 
 * The polynomials are in the form `p1*p2` where the zeros
 * of `p1` are the inflection points and the zeros of `p2` are the other minima /
 * maxima.
 * 
 * * **precondition:** must be a `true` cubic bezier (not degenerate to line or
 * quadratic)
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)
 * * **non-exact:** due to floating point roundof during calculation
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an array of its control 
 * points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @internal
 */
function getAbsCurvatureExtremaPolysE(
        ps: number[][]): {
            inflectionPoly: number[][];
            otherExtremaPoly: number[][];
        } {

    // It is a real cubic - use the excellent answer from the description:
    // dd(kappa^2)/dt === (x′′y′ − x′y′′)*((x′′′y′ − x′y′′′)(x′2 + y′2) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′))
    // Inflection points at: (x′′y′ − x′y′′) === 0
    // Max abs curvature at: ((x′′′y′ − x′y′′′)(x′2 + y′2) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′)) === 0
    
    const [[dx2,dx1,dx0],[dy2,dy1,dy0]] = toPowerBasis_1stDerivativeExact(ps);    // max bitlength increase === 5
    const [[ddx1,ddx0],[ddy1,ddy0]] = toPowerBasis_2ndDerivativeExact(ps);   // max bitlength increase === 6
    const [dddx,dddy] = toPowerBasis_3rdDerivativeExact(ps); // max bitlength increase === 6

    // ((x′′′y′ − x′y′′′)(x′2 + y′2) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′))
    // or 
    // x′′′x′x′y′ + x′′′y′y′y′ - y′′′x′x′x′ - y′′′x′y′y′ + 
    // 3(x′′y′′x′x′ - x′′x′′x′y′ - x′′y′′y′y′ + y′′y′′x′y′)
    // The above line becomes
    // ((dddx*dy(t) − dx(t)*dddy)(dx(t)dx(t) + dy(t)dy(t)) − 3(dx(t)ddx(t) + dy(t)ddy(t))(ddx(t)dy(t) − dx(t)ddy(t)))
    // or 
    // dddx*dxt**2*dyt + dddx*dyt**3 - dddy*dxt**3 - dddy*dxt*dyt**2 - 
    // 3*ddxt**2*dxt*dyt + 3*ddxt*ddyt*dxt**2 - 3*ddxt*ddyt*dyt**2 + 3*ddyt**2*dxt*dyt
    // which becomes: (after substituting e.g. dy(t) = dy2*t^2 + dy1*t + dy0, etc. using Python and
    // then expanding and collecting terms)

    const dddx_dy1 = eme(dddx,dy1);
    const dddy_dx1 = eme(dddy,dx1);
    const ddx0_dy0 = eme(ddx0,dy0);
    const ddx0_dy1 = eme(ddx0,dy1);

    const ddy1_ddy1 = eme(ddy1,ddy1);

    const ddx1_dy0 = eme(ddx1,dy0);
    const ddy0_dx0 = eme(ddy0,dx0);
    const ddy0_dx1 = eme(ddy0,dx1);
    const ddy1_dx0 = eme(ddy1,dx0);
    
    const dx0_dx1 = eme(dx0,dx1);
    const dx0_dx2 = eme(dx0,dx2);
    const dx0_dy2 = eme(dx0,dy2);
    const dx1_dx1 = eme(dx1,dx1);
    const dx1_dx2 = eme(dx1,dx2);
    const dx1_dy1 = eme(dx1,dy1);
    const dx2_dy0 = eme(dx2,dy0);
    const dx2_dy2 = eme(dx2,dy2);
    const dx2_dx2 = eme(dx2,dx2);

    const dy0_dy1 = eme(dy0,dy1);
    const dy0_dy2 = eme(dy0,dy2);
    const dy1_dy1 = eme(dy1,dy1);
    const dy1_dy2 = eme(dy1,dy2);
    const dy2_dy2 = eme(dy2,dy2);

    const ss = ede(eme(dddx,dy0), eme(dddy,dx0));
    const uu = ede(dddx_dy1, dddy_dx1);
    const vv = eae(eme(ddx0,dx0), eme(ddy0,dy0));
    const ww = eae(
        eae(eme(ddx0,dx1), eme(ddx1,dx0)),
        eae(eme(ddy0,dy1),eme(ddy1,dy0))
    );
    const xx = ede(ddx0_dy0,ddy0_dx0);
    const yy = ede(eae(ddx0_dy1,ddx1_dy0),eae(ddy0_dx1,ddy1_dx0));
    const qq = eae(eme(dx0,dx0),eme(dy0,dy0));
    const rr = eae(dx0_dx1,dy0_dy1);

    // t6 cancels! see https://math.stackexchange.com/a/1956264/130809

    const z1 = eae(dx1_dy1,dx2_dy0);
    const z2 = eae(dy0_dy2,dy1_dy1);
    const z3 = eae(dx0_dx2,dx1_dx1);
    const z4 = eae(eme(dx1,dy2),eme(dx2,dy1));
    const z5 = ede(dx2_dx2,dy2_dy2);
    const z6 = ede(dx1_dx2,dy1_dy2);
    const z7 = eae(dx0_dy2,dx1_dy1);
    const z8 = ede(dx0_dx1,dy0_dy1);
    const z9 = eae(eme(dx0,dy1),eme(dx1,dy0));

    const x1 = eae(dy0_dy2,z2);
    const x2 = eae(dx0_dx2,z3);
    const x3 = eae(dx0_dy2,z1);
    const x4 = eae(dx1_dy1,z1);
    const x5 = ede(x2,x1);
    const x6 = eae(z1,dx2_dy0);
    const x7 = eae(z7,dx2_dy0);
    const x8 = eae(em2(ddy0_dx1),ddy1_dx0);

    // const t5 = 
    //     dx2_dx2*(dddx_dy1 - 3*dddy_dx1) + 
    //     dy2_dy2*(3*dddx_dy1 - dddy_dx1) + 
    //     2*((dx2_dy2)*((dddx*dx1 - dddy*dy1) + 3*(ddy0*ddy1 - ddx0*ddx1)) + 3*ddx1*ddy1*z6) + 
    //     3*(z4*(ddy1_ddy1 - ddx1*ddx1) + z5*(ddx0*ddy1 + ddy0*ddx1));
    const a1 = eme(dx2_dx2,(ede(dddx_dy1,emd(dddy_dx1,3))));
    const a2 = eme(dy2_dy2,(ede(emd(dddx_dy1,3),dddy_dx1)));
    const a3 = em2(eae(
        eme(dx2_dy2,(eae(
            ede(eme(dddx,dx1),eme(dddy,dy1)),
            emd(ede(eme(ddy0,ddy1),eme(ddx0,ddx1)),3)
        ))),
        emd(eme(eme(ddx1,ddy1),z6),3)
    ));
    const a4 = emd((eae(
        eme(z4,(ede(ddy1_ddy1,eme(ddx1,ddx1)))),
        eme(z5,(eae(eme(ddx0,ddy1),eme(ddy0,ddx1))))
    )),3);
    const t5 = eae(eae(a1,a2),eae(a3,a4));

    // const t4 = 
    //     dddx*(dy2*(x2 + 3*z2) + dx2*x4) -
    //     dddy*(dx0*(3*dx2_dx2 + dy2_dy2) + dx1*(3*dx1_dx2 + 2*dy1_dy2) + dx2*x1) + 
    //     3*(
    //         ddx0*((ddy0*z5 - ddx0*dx2_dy2) + 2*(ddy1*z6 - ddx1*z4)) + 
    //         ddx1*(2*ddy0*z6 + ddy1*(2*(dx0_dx2 - dy0_dy2) + (dx1_dx1 - dy1_dy1)) - ddx1*x7) + 
    //         ddy0*(ddy0*dx2_dy2 + 2*ddy1*z4) + 
    //         ddy1_ddy1*x3
    //     );
    const b1 = eme(dddx,(eae(eme(dy2,(eae(x2,emd(z2,3)))),eme(dx2,x4))));
    const b2 = eme(dddy,
        eae(
            eae(
                eme(dx0,(eae(emd(dx2_dx2,3),dy2_dy2))),
                eme(dx1,(eae(emd(dx1_dx2,3),em2(dy1_dy2))))
            ),
            eme(dx2,x1)
        )
    );
    const b3 = emd(
        eae(
            eae(
                eme(ddx0,(
                    eae(
                        (ede(eme(ddy0,z5),eme(ddx0,dx2_dy2))),
                        em2((ede(eme(ddy1,z6),eme(ddx1,z4))))
                    )
                )),
                eme(ddx1,(
                    ede(
                        eae(
                            em2(eme(ddy0,z6)),
                            eme(ddy1,(
                                eae(
                                    em2(ede(dx0_dx2,dy0_dy2)),
                                    (ede(dx1_dx1,dy1_dy1))
                                )
                            ))
                        ),
                        eme(ddx1,x7)
                    )
                ))
            ),
            eae(
                eme(ddy0,(eae(eme(ddy0,dx2_dy2),em2(eme(ddy1,z4))))),
                eme(ddy1_ddy1,x3)
            )
        )
    ,3);
    const t4 = eae(ede(b1,b2),b3);


    // const t3 =
    //     dddx*(2*dx0*z4 + dx1*x6 + dy1*(4*dy0_dy2 + x1)) - 
    //     dddy*(2*dx0*(3*dx1_dx2 + dy1_dy2) + dx1*(dx1_dx1 + 2*dy0_dy2) + dy1*x6) + 
    //     3*(
    //         ddx0*(2*(ddy0*z6 - ddx1*x7) + ddy1*x5 - ddx0*z4) + 
    //         ddx1*(2*ddy1*z8 - ddx1*z9) +
    //         ddy0*(ddy0*z4 + 2*ddy1*x3 + ddx1*x5) + 
    //         ddy1_ddy1*z9
    //     );
    const c1 = eme(dddx,(
        eae(
            eae(
                em2(eme(dx0,z4)),
                eme(dx1,x6)
            ),
            eme(dy1,(eae(em4(dy0_dy2),x1)))
        )
    ));
    const c2 = eme(dddy,(
        eae(
            eae(
                em2(eme(dx0,(eae(emd(dx1_dx2,3),dy1_dy2)))),
                eme(dx1,(eae(dx1_dx1,em2(dy0_dy2))))
            ),
            eme(dy1,x6)
        )
    ));
    const c3 = emd((
        eae(
            eae(
                eme(ddx0,(
                    ede(
                        eae(
                            em2(ede(eme(ddy0,z6),eme(ddx1,x7))),
                            eme(ddy1,x5)
                        ),
                        eme(ddx0,z4)
                    )
                )),
                eme(ddx1,(ede(em2(eme(ddy1,z8)),eme(ddx1,z9))))
            ),
            eae(
                eme(ddy0,(
                    eae(
                        eae(
                            eme(ddy0,z4),
                            em2(eme(ddy1,x3))
                        ),
                        eme(ddx1,x5)
                    )
                )),
                eme(ddy1_ddy1,z9)
            )
        )
    ),3);
    const t3 = eae(ede(c1,c2),c3);

    // const t2 = 
    //     dddx*(dx0*(dx0_dy2 + 2*z1) + dy0*(dx1_dx1 + 3*z2)) -
    //     dddy*(dx0*(3*z3 + x1) + dy0*x4) + 
    //     3*(
    //         ddx0*(ddy0*x5 - ddx0*x3 + 2*(ddy1*z8 - ddx1*z9)) + 
    //         ddx1*(dx0*(x8 - ddx1*dy0) - dy0*(2*ddy0*dy1 + ddy1*dy0)) + 
    //         ddy0*(ddy0*z1 + dx0*(2*ddy1*dy1 + ddy0*dy2)) + 
    //         ddy1*dy0*x8
    //     );
    const d1 = eme(dddx,(
        eae(
            eme(dx0,(eae(dx0_dy2,em2(z1)))),
            eme(dy0,(eae(dx1_dx1,emd(z2,3))))
        )
    ));
    const d2 = eme(dddy,(eae(eme(dx0,(eae(emd(z3,3),x1))),eme(dy0,x4))));
    const d3 = emd((
        eae(
            eae(
                eme(ddx0,(
                    eae(
                        ede(
                            eme(ddy0,x5),
                            eme(ddx0,x3)
                        ),
                        em2(ede(eme(ddy1,z8),eme(ddx1,z9)))
                    )
                )),
                eme(ddx1,(
                    ede(
                        eme(dx0,(ede(x8,eme(ddx1,dy0)))),
                        eme(dy0,(eae(em2(eme(ddy0,dy1)),eme(ddy1,dy0))))
                    )
                ))
            ),
            eae(
                eme(ddy0,(
                    eae(
                        eme(ddy0,z1),
                        eme(dx0,(eae(em2(eme(ddy1,dy1)),eme(ddy0,dy2))))
                    )
                )),
                eme(ddy1,eme(dy0,x8))
            )
        )
    ),3);
    const t2 = eae(ede(d1,d2),d3);

    // const t1 = (qq*uu + 2*rr*ss) - 3*(vv*yy + ww*xx)
    const t1 = ede((eae(eme(qq,uu),em2(eme(rr,ss)))), emd(eae(eme(vv,yy),eme(ww,xx)),3));

    // const t0 = ss*qq - 3*vv*xx;
    const t0 = ede(eme(ss,qq),emd(eme(vv,xx),3));


    const r3 = ede(eme(ddx1,dy2),eme(ddy1,dx2));
    const r2 = ede(
        eae(eme(ddx0,dy2),eme(ddx1,dy1)),
        eae(eme(ddy0,dx2),eme(ddy1,dx1))
    );
    const r1 = ede(eae(ddx0_dy1,ddx1_dy0),eae(ddy0_dx1,ddy1_dx0));
    const r0 = ede(ddx0_dy0,ddy0_dx0);

    return {
        inflectionPoly: [r3,r2,r1,r0],
        otherExtremaPoly: [t5,t4,t3,t2,t1,t0]
    };
}


export { getAbsCurvatureExtremaPolysE }
