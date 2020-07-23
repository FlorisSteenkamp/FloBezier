
from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, linsolve, symbols, nonlinsolve
from sympy import diff, simplify, collect, factor, rem, pdiv


def getCurvatureExtrema_quadratic():
    # constants
    x0, x1, x2 = symbols('x0 x1 x2')
    y0, y1, y2 = symbols('y0 y1 y2')

    # variables
    t = symbols('t')

    x = (1-t)**2*x0 + 2*(1-t)*t*x1 + t**2*x2
    y = (1-t)**2*y0 + 2*(1-t)*t*y1 + t**2*y2

    x1_ = diff(x,t)
    y1_ = diff(y,t)

    x2_ = diff(x1_,t)
    y2_ = diff(y1_,t)

    n = simplify(x1_*y2_ - y1_*x2_)
    dd = x1_*x1_ + y1_*y1_
    d = dd**(3/2)

    print(n)
    #print(d)


    dd1 = expand(simplify(diff(dd,t)))
    #dd1 = simplify(diff(dd,t))

    dd1 = collect(dd1, t)

    #print(factor(x0**2 - 4*x0*x1 + 2*x0*x2 + 4*x1**2 - 4*x1*x2 + x2**2))
    #print(pdiv(x0**2 - 4*x0*x1 + 2*x0*x2 + 4*x1**2 - 4*x1*x2 + x2**2, x1 - x0))
    #print(expand((x0 - 2*x1 + x2)**2))
    #print(factor(x0**2 - 3*x0*x1 + x0*x2 + 2*x1**2 - x1*x2 + y0**2 - 3*y0*y1 + y0*y2 + 2*y1**2 - y1*y2))

    print(dd1)

    #dd1 = t*(8*x0**2 - 32*x0*x1 + 16*x0*x2 + 32*x1**2 - 32*x1*x2 + 8*x2**2 + 
    # 8*y0**2 - 32*y0*y1 + 16*y0*y2 + 32*y1**2 - 32*y1*y2 + 8*y2**2) - 
    # 8*x0**2 + 24*x0*x1 - 8*x0*x2 - 16*x1**2 + 8*x1*x2 - 8*y0**2 + 24*y0*y1 - 
    # 8*y0*y2 - 16*y1**2 + 8*y1*y2

    return dd1


getCurvatureExtrema_quadratic()
