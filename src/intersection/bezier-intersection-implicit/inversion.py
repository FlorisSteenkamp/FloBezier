
from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial


def inversionCubicBezierForm():
    x3 = Symbol('x3')
    y3 = Symbol('y3')
    x2 = Symbol('x2')
    y2 = Symbol('y2')
    x1 = Symbol('x1')
    y1 = Symbol('y1')
    x0 = Symbol('x0')
    y0 = Symbol('y0')

    xi = Symbol('xi')
    yi = Symbol('yi')
    xj = Symbol('xj')
    yj = Symbol('yj')

    x = Symbol('x')
    y = Symbol('y')
    t = Symbol('t')

    def lij():
        M = Matrix([[x,y,1], [xi,yi,1], [xj,yj,1]])
        D = det(M)
        return Poly(D)

    def bin3(i,j):
        return binomial(3,i) * binomial(3,j)

    ps = [[0.5,0.25],[1,1],[2,-1],[3,0]]

    P32 = bin3(3,2) * lij()
    l32 = Poly(P32.subs(xi, x3).subs(xj, x2).subs(yi, y3).subs(yj, y2), x, y)
    l32_ = l32.subs(x3, ps[3][0]).subs(x2, ps[2][0]).subs(y3, ps[3][1]).subs(y2, ps[2][1])

    P31 = bin3(3,1) * lij()
    l31 = Poly(P31.subs(xi, x3).subs(xj, x1).subs(yi, y3).subs(yj, y1), x, y)
    l31_ = l31.subs(x3, ps[3][0]).subs(x1, ps[1][0]).subs(y3, ps[3][1]).subs(y1, ps[1][1])

    P30 = bin3(3,0) * lij()
    l30 = Poly(P30.subs(xi, x3).subs(xj, x0).subs(yi, y3).subs(yj, y0), x, y)
    l30_ = l30.subs(x3, ps[3][0]).subs(x0, ps[0][0]).subs(y3, ps[3][1]).subs(y0, ps[0][1])

    P21 = bin3(2,1) * lij()
    l21 = Poly(P21.subs(xi, x2).subs(xj, x1).subs(yi, y2).subs(yj, y1), x, y)
    l21_ = l21.subs(x2, ps[2][0]).subs(x1, ps[1][0]).subs(y2, ps[2][1]).subs(y1, ps[1][1])

    P20 = bin3(2,0) * lij()
    l20 = Poly(P20.subs(xi, x2).subs(xj, x0).subs(yi, y2).subs(yj, y0), x, y)
    l20_ = l20.subs(x2, ps[2][0]).subs(x0, ps[0][0]).subs(y2, ps[2][1]).subs(y0, ps[0][1])

    P10 = bin3(1,0) * lij()
    l10 = Poly(P10.subs(xi, x1).subs(xj, x0).subs(yi, y1).subs(yj, y0), x, y)
    l10_ = l10.subs(x1, ps[1][0]).subs(x0, ps[0][0]).subs(y1, ps[1][1]).subs(y0, ps[0][1])

    M = Matrix([[l32,l31,l30], [l31,l30 + l21,l20], [l30,l20,l10]])
    M_ = Matrix([[l32_,l31_,l30_], [l31_,l30_ + l21_,l20_], [l30_,l20_,l10_]])

    T2 = sympify('t**2')
    T1 = sympify('t*(1-t)')
    T0 = sympify('(1-t)**2')
    T = Matrix([[T2],[T1],[T0]])

    INV1_ = expand(M_[0]*T2 + M_[1]*T1 + M_[2]*T0)
    INV2_ = expand(M_[3]*T2 + M_[4]*T1 + M_[5]*T0)
    INV3_ = expand(M_[6]*T2 + M_[7]*T1 + M_[8]*T0)

    INV1 = Poly(expand(M[0]*T2 + M[1]*T1 + M[2]*T0), t)
    INV2 = Poly(expand(M[3]*T2 + M[4]*T1 + M[5]*T0), t)
    INV3 = Poly(expand(M[6]*T2 + M[7]*T1 + M[8]*T0), t)

    p = [3,0]

    Pt1 = INV1_.subs(x,p[0]).subs(y,p[1])
    Pt2 = INV2_.subs(x,p[0]).subs(y,p[1])
    Pt3 = INV3_.subs(x,p[0]).subs(y,p[1])
    t1 = solve(Pt1)
    t2 = solve(Pt2)
    t3 = solve(Pt3)

    print('INV1', INV1)
    print()
    print('INV2', INV2)
    print()
    print('INV3', INV3)
    print()

    print('Pt1: ', Pt1)
    print('Pt2: ', Pt2)
    print('Pt3: ', Pt3)
    print('t1: ', t1)
    print('t2: ', t2)
    print('t3: ', t3)

    #P = det(M)
    #Ps = P
    #Ps = Ps.subs(x0,ps[0][0]).subs(y0,ps[0][1]).subs(x1,ps[1][0]).subs(y1,ps[1][1])
    #Ps = Ps.subs(x2,ps[2][0]).subs(y2,ps[2][1]).subs(x3,ps[3][0]).subs(y3,ps[3][1])


def inversionQuadraticBezierForm():
    x2 = Symbol('x2')
    y2 = Symbol('y2')
    x1 = Symbol('x1')
    y1 = Symbol('y1')
    x0 = Symbol('x0')
    y0 = Symbol('y0')

    xi = Symbol('xi')
    yi = Symbol('yi')
    xj = Symbol('xj')
    yj = Symbol('yj')

    x = Symbol('x')
    y = Symbol('y')
    t = Symbol('t')

    def lij():
        M = Matrix([[x,y,1], [xi,yi,1], [xj,yj,1]])
        D = det(M)
        return Poly(D)

    def bin2(i,j):
        return binomial(2,i) * binomial(2,j)

    ps = [[0,-0.5],[0.25,3],[2,-1]]

    P21 = bin2(2,1) * lij()
    l21 = Poly(P21.subs(xi, x2).subs(xj, x1).subs(yi, y2).subs(yj, y1), x, y)
    l21_ = l21.subs(x2, ps[2][0]).subs(x1, ps[1][0]).subs(y2, ps[2][1]).subs(y1, ps[1][1])

    P20 = bin2(2,0) * lij()
    l20 = Poly(P20.subs(xi, x2).subs(xj, x0).subs(yi, y2).subs(yj, y0), x, y)
    l20_ = l20.subs(x2, ps[2][0]).subs(x0, ps[0][0]).subs(y2, ps[2][1]).subs(y0, ps[0][1])

    P10 = bin2(1,0) * lij()
    l10 = Poly(P10.subs(xi, x1).subs(xj, x0).subs(yi, y1).subs(yj, y0), x, y)
    l10_ = l10.subs(x1, ps[1][0]).subs(x0, ps[0][0]).subs(y1, ps[1][1]).subs(y0, ps[0][1])

    M = Matrix([[l21,l20], [l20,l10]])
    M_ = Matrix([[l21_,l20_], [l20_,l10_]])

    T1 = sympify('t')
    T0 = sympify('(1-t)')
    T = Matrix([[T1],[T0]])

    INV1_ = expand(M_[0]*T1 + M_[1]*T0)
    INV2_ = expand(M_[2]*T1 + M_[3]*T0)

    INV1 = Poly(expand(M[0]*T1 + M[1]*T0), t)
    INV2 = Poly(expand(M[2]*T1 + M[3]*T0), t)

    p = [2,-1]

    Pt1 = INV1_.subs(x,p[0]).subs(y,p[1])
    Pt2 = INV2_.subs(x,p[0]).subs(y,p[1])
    t1 = solve(Pt1)
    t2 = solve(Pt2)


    print('INV1', INV1)
    print()
    print('INV2', INV2)
    print()

    print('Pt1: ', Pt1)
    print('Pt2: ', Pt2)
    print('t1: ', t1)
    print('t2: ', t2)

    #P = det(M)

    #Ps = P
    #Ps = Ps.subs(x0,ps[0][0]).subs(y0,ps[0][1]).subs(x1,ps[1][0]).subs(y1,ps[1][1])
    #Ps = Ps.subs(x2,ps[2][0]).subs(y2,ps[2][1])

inversionCubicBezierForm()
inversionQuadraticBezierForm()    