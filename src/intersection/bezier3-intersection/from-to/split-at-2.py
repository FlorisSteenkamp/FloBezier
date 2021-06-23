from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, linsolve, symbols, nonlinsolve


def splitAtRight2():
    # constants
    t = symbols('t')
    x0, x1, x2 = symbols('x0 x1 x2')
    xx0, xx1, xx2 = symbols('xx0 xx1 xx2')

    # variables
    s = 1 - t
    tt = t*t
    ss = s*s
    st = t*s

    xx0 = x0*ss + 2*x1*st + x2*tt
    xx1 = x1*s + x2*t
    xx2 = x2

    #print(xx0)
    #print(xx1)
    #print(xx2)

    return xx0, xx1, xx2


def splitAtLeft2():
    # constants
    t = symbols('tM')
    x0, x1, x2 = symbols('x0 x1 x2')
    xx0, xx1, xx2 = symbols('xx0 xx1 xx2')

    # variables
    s = 1 - t
    tt = t*t
    ss = s*s
    ts = t*s

    xx0 = x0
    xx1 = x1*t + x0*s
    xx2 = x2*tt + 2*x1*ts + x0*ss 

    #print(x0)
    #print(xx1)
    #print(xx2)

    return xx0, xx1, xx2


def splitAt2():
    # constants
    t, tE, tM = symbols('t tE tM')
    x0, x1, x2 = symbols('x0 x1 x2')
    s, tt, ss, ts = symbols('s tt ss ts')
    s_, tt_, ss_, ts_ = symbols('s_ tt_ ss_ ts_')
    
    # splitRight
    x0_ = x0*ss + 2*x1*ts + x2*tt
    x1_ = x1*s + x2*t
    x2_ = x2

    # splitLeft
    xx0 = x0_
    xx1 = x1_*tM + x0_*s_
    xx2 = x2_*tt_ + 2*x1_*ts_ + x0_*ss_

    print(xx0)
    print(xx1)
    print(xx2)

    #return x0, x1, x2

#splitAtRight2()
#splitAtLeft2()
splitAt2()