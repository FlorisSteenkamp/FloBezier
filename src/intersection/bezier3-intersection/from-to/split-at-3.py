from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, linsolve, symbols, nonlinsolve


def splitAtRight3():
    # constants
    tS = symbols('tS')
    a1, a0, b1, b0 = symbols('a1 a0 b1 b0')
    x0, x1, x2, x3 = symbols('x0 x1 x2 x3')
    y0, y1, y2, y3 = symbols('y0 y1 y2 y3')

    # variables
    s = 1 - tS
    t2 = tS*tS
    t3 = tS*t2
    s2 = s*s
    s3 = s*s2
    ts = tS*s

    x0 = x3*t3 + 3*(x2*s*t2 + x1*s2*tS) + x0*s3
    x1 = x3*t + 2*x2*ts + x1*s2
    x2 = x3*t + x2*s
    #x3 = x3

    #r1 = r1.subs(x,x_)

    print(x0)
    print(x1)
    print(x2)
    print(x3)
    return x0, x1, x2, x3


def splitAtLeft3():
    # constants
    tM = symbols('tM')
    x0, x1, x2, x3 = symbols('x0 x1 x2 x3')
    y0, y1, y2, y3 = symbols('y0 y1 y2 y3')

    # variables
    s = 1 - tM
    t2 = tM*tM
    t3 = tM*t2
    s2 = s*s
    s3 = s*s2
    ts = tM*s

    #x0 = x0
    x1 = x1*tM + x0*s
    x2 = x2*t2 + 2*x1*ts + x0*s2 
    x3 = x3*t3 + 3*(x2*s*t2 + x1*s2*tM) + x0*s3 

    print(x0)
    print(x1)
    print(x2)
    print(x3)
    return x0, x1, x2, x3


def splitAt3():
    # constants
    tS, tE, tM = symbols('tS tE tM')
    x0, x1, x2, x3 = symbols('x0 x1 x2 x3')
    s, t2, t3, s2, s3, ts = symbols('s t2 t3 s2 s3 ts')
    s_, t2_, t3_, s2_, s3_, ts_ = symbols('s_ t2_ t3_ s2_ s3_ ts_')
    
    # splitRight
    #tM = (tE - tS)/(1 - tS)
    #s = 1 - tS
    #t2 = tS*tS
    #t3 = tS*t2
    #s2 = s*s
    #s3 = s*s2
    #ts = tS*s

    # splitLeft
    #s_ = 1 - tM
    #t2_ = tM*tM
    #t3_ = tM*t2_
    #s2_ = s_*s_
    #s3_ = s_*s2_
    #ts_ = tM*s_


    # splitRight
    x0_ = x3*t3 + 3*(x2*s*t2 + x1*s2*tS) + x0*s3
    x1_ = x3*t2 + 2*x2*ts + x1*s2
    x2_ = x3*tS + x2*s
    x3_ = x3

    # splitLeft
    xx0 = x0_
    xx1 = x1_*tM + x0_*s_
    xx2 = x2_*t2_ + 2*x1_*ts_ + x0_*s2_
    xx3 = x3_*t3_ + 3*(x2_*s_*t2_ + x1_*s2_*tM) + x0_*s3_

    print(xx0)
    print(xx1)
    print(xx2)
    print(xx3)

    return xx0, xx1, xx2, xx3

#splitAtRight3()
#splitAtLeft3()
splitAt3()