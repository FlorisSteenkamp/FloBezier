

from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, collect


def run():
    t,x0,x1,x2,x3 = map(Symbol, ['t','x0','x1','x2','x3'])

    a01 = x0 + (x1 - x0)*t
    a11 = x1 + (x2 - x1)*t
    a21 = x2 + (x3 - x2)*t
    a02 = a01 + (a11 - a01)*t
    a12 = a11 + (a21 - a11)*t
    x = a02 + (a12 - a02)*t

    a = expand(a11 - a01)
    a = collect(a,t)
    print(a)

    #a02 = expand(a02)
    #print(a02)
    #print(x)


run()
