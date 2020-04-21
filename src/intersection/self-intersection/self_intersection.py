
# This code is a modified version of code from 
# http://www.mare.ee/indrek/misc/2d.pdf

from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, factor, collect, terms_gcd
from sympy import simplify


def self_intersection():
    # starting from the required conditions in the case of a cubic:
    # a3(t² + st + s²) + a2(t + s) + a1 = 0
    # b3(t² + st + s²) + b2(t + s) + b1 = 0

    x,y,t,s = map(Symbol, ['x','y','t','s'])

    q1,q2,q3 = map(Symbol, ['q1','q2','q3'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    a2_, a1_, a0_ = map(Symbol, ['a2_','a1_','a0_'])
    b2_, b1_, b0_ = map(Symbol, ['b2_','b1_','b0_'])
    A3, A2, A1, A0 = map(Symbol, ['A3','A2','A1','A0'])
    B3, B2, B1, B0 = map(Symbol, ['B3','B2','B1','B0'])
    x3, x2, x1, x0 = map(Symbol, ['x3','x2','x1','x0'])
    y3, y2, y1, y0 = map(Symbol, ['y3','y2','y1','y0'])

    Q1 = a2_*b1_ - a1_*b2_
    Q2 = a2_*b0_ - a0_*b2_
    Q3 = a1_*b0_ - a0_*b1_

    M = Matrix([
        [q1, q2],
        [q2, q3]
    ])

    m = det(M)

    m = m.subs(q1,Q1).subs(q2,Q2).subs(q3,Q3)

    m = m.subs(a2_,a3).subs(b2_,b3)
    m = m.subs(a1_,a3*s + a2).subs(b1_,b3*s + b2)
    m = m.subs(a0_,a3*s**2 + a2*s + a1).subs(b0_,b3*s**2 + b2*s + b1)

    m = expand(-1*m)

    m = collect(m,s)

    A3 = x3 - 3*x2 + 3*x1 - x0
    A2 = 3*x2 - 6*x1 + 3*x0
    A1 = 3*x1 - 3*x0
    B3 = y3 - 3*y2 + 3*y1 - y0
    B2 = 3*y2 - 6*y1 + 3*y0
    B1 = 3*y1 - 3*y0

    m = m.subs(a3,A3).subs(a2,A2).subs(a1,A1)
    m = m.subs(b3,B3).subs(b2,B2).subs(b1,B1)

    m = expand(m)

    m = collect(m,s)

    print(m)

    # s**2*(a2**2*b3**2 - 2*a2*a3*b2*b3 + a3**2*b2**2) + 
    # s*(a1*a2*b3**2 - a1*a3*b2*b3 - a2*a3*b1*b3 + a3**2*b1*b2)
    # a1**2*b3**2 - a1*a2*b2*b3 - 2*a1*a3*b1*b3 + a1*a3*b2**2 + a2**2*b1*b3 - a2*a3*b1*b2 + a3**2*b1**2 + 


def play():
    # starting from the required conditions in the case of a cubic:
    # a3(t² + st + s²) + a2(t + s) + a1 = 0
    # b3(t² + st + s²) + b2(t + s) + b1 = 0

    x,y,t,s = map(Symbol, ['x','y','t','s'])

    q1,q2,q3 = map(Symbol, ['q1','q2','q3'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    a2_, a1_, a0_ = map(Symbol, ['a2_','a1_','a0_'])
    b2_, b1_, b0_ = map(Symbol, ['b2_','b1_','b0_'])
    A3, A2, A1, A0 = map(Symbol, ['A3','A2','A1','A0'])
    B3, B2, B1, B0 = map(Symbol, ['B3','B2','B1','B0'])
    x3, x2, x1, x0 = map(Symbol, ['x3','x2','x1','x0'])
    y3, y2, y1, y0 = map(Symbol, ['y3','y2','y1','y0'])

    Q1 = a2_*b1_ - a1_*b2_
    Q2 = a2_*b0_ - a0_*b2_
    Q3 = a1_*b0_ - a0_*b1_


    A3 = x3 - 3*x2 + 3*x1 - x0
    A2 = 3*x2 - 6*x1 + 3*x0
    A1 = 3*x1 - 3*x0
    B3 = y3 - 3*y2 + 3*y1 - y0
    B2 = 3*y2 - 6*y1 + 3*y0
    B1 = 3*y1 - 3*y0

    m = a2*b3 - a3*b2
    m = m.subs(a3,A3).subs(a2,A2).subs(a1,A1)
    m = m.subs(b3,B3).subs(b2,B2).subs(b1,B1)

    m = expand(m)
    m = collect(m,s)

    print(m)

    # s**2*(a2**2*b3**2 - 2*a2*a3*b2*b3 + a3**2*b2**2) + 
    # s*(a1*a2*b3**2 - a1*a3*b2*b3 - a2*a3*b1*b3 + a3**2*b1*b2)
    # a1**2*b3**2 - a1*a2*b2*b3 - 2*a1*a3*b1*b3 + a1*a3*b2**2 + a2**2*b1*b3 - a2*a3*b1*b2 + a3**2*b1**2 +     


play()
#self_intersection()
