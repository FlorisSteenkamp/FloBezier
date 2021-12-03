from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, linsolve, symbols, nonlinsolve


def splitAtRight1():
    # constants
    t = symbols('t')
    x0, x1 = symbols('x0 x1')
    xx0, xx1 = symbols('xx0 xx1')

    # variables
    s = 1 - t

    xx0 = s*x0 + t*x1
    xx1 = x1

    print(xx0)
    print(xx1)

    return xx0, xx1


def splitAtLeft1():
    # constants
    t = symbols('t')
    x0, x1 = symbols('x0 x1')
    xx0, xx1 = symbols('xx0 xx1')

    # variables
    s = 1 - t

    xx0 = x0
    xx1 = s*x0 + t*x1

    print(xx0)
    print(xx1)

    return xx0, xx1


def splitAt1():
    # constants
    t, tM = symbols('t tM')
    x0, x1 = symbols('x0 x1')
    s, s_ = symbols('s s_')
    
    s = 1 - t
    s_ = 1 - tM

    # splitRight
    x0_ = s*x0 + t*x1
    x1_ = x1

    # splitLeft
    xx0 = x0_
    xx1 = s_*x0_ + tM*x1_


    print(xx0)
    print(xx1)

    return xx0, xx1

#splitAtRight1()
#splitAtLeft1()
splitAt1()