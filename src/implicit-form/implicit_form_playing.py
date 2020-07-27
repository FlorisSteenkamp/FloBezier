
# This code is a modified version of code from 
# http://www.mare.ee/indrek/misc/2d.pdf

from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, factor, collect, terms_gcd
from sympy import simplify


def implicit_cubic():
    x,y,t = map(Symbol, ['x','y','t'])
    #a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    #b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])

    x3, x2, x1, x0 = map(Symbol, ['x3','x2','x1','x0'])
    y3, y2, y1, y0 = map(Symbol, ['y3','y2','y1','y0'])

    a3 = x3 + 3*(x1 - x2) - x0
    a2 = 3*(x2 - 2*x1 + x0)
    a1 = 3*(x1 - x0)
    a0 = x0

    b3 = y3 + 3*(y1 - y2) - y0
    b2 = 3*(y2 - 2*y1 + y0)
    b1 = 3*(y1 - y0)
    b0 = y0

    p1 = expand(a3*b0 - a0*b3)

    
    print(p1)

    return p1


implicit_cubic()


