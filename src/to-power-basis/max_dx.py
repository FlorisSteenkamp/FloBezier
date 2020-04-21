
from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, collect


def cubicD():
    t,x0,x1,x2,x3 = map(Symbol, ['t','x0','x1','x2','x3'])

    t2 = 3*(x3 + 3*(x1 - x2) - x0)
    t1 = 6*(x2 - 2*x1 + x0)
    t0 = 3*(x1 - x0)

    # max absolute values of any X? === 1, we need max value of T at bottom
    # the below are x-values of control points of cubic bezier curve
    X0 = -1
    X1 = 1
    X2 = -0
    X3 = -0.25

    T2 = t2.subs(x3,X3).subs(x2,X2).subs(x1,X1).subs(x0,X0)
    T1 = t1.subs(x2,X2).subs(x1,X1).subs(x0,X0)
    T0 = t0.subs(x1,X1).subs(x0,X0)
    
    print(T2)  # coeff for t**2
    print(T1)  # coeff for t**1
    print(T0)  # coeff for t**0

    T = T2*t*t + T1*t + T0

    print(T)

    paramval = 0

    TT = T.subs(t,paramval)

    print(TT)


def cubicDd():
    t,x0,x1,x2,x3 = map(Symbol, ['t','x0','x1','x2','x3'])

    t1 = 6*(x3 + 3*(x1 - x2) - x0)
    t0 = 6*(x2 - 2*x1 + x0)

    # max absolute values of any X? === 1, we need max value of T at bottom
    # the below are x-values of control points of cubic bezier curve
    X0 = 1
    X1 = 1
    X2 = -1
    X3 = 1

    T1 = t1.subs(x3,X3).subs(x2,X2).subs(x1,X1).subs(x0,X0)
    T0 = t0.subs(x2,X2).subs(x1,X1).subs(x0,X0)
    
    print(T1)  # coeff for t**1
    print(T0)  # coeff for t**0

    T = T1*t + T0

    print(T)

    paramval = 1

    TT = T.subs(t,paramval)

    print(TT)


def cubicDdd():
    x0,x1,x2,x3 = map(Symbol, ['x0','x1','x2','x3'])

    t = 6*(x3 + 3*(x1 - x2) - x0)

    # max absolute values of any X? === 1, we need max value of T at bottom
    # the below are x-values of control points of cubic bezier curve
    X0 = 1
    X1 = -1
    X2 = 1
    X3 = -1

    T = t.subs(x3,X3).subs(x2,X2).subs(x1,X1).subs(x0,X0)
    
    print(T)

    paramval = 1

    TT = T.subs(t,paramval)

    print(TT)


#cubicD()
#cubicDd()
cubicDdd()
