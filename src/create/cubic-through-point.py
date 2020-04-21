
from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, linsolve, symbols, nonlinsolve


def generateCubicGoingPointGiven013():
    # values
    x0_,y0_,  x1_,y1_,  x3_,y3_ = 0,0, 1,1, 3,0
    x_ = 2
    y_ = 2

    # constants
    x, y = symbols('x y')
    a1, a0, b1, b0 = symbols('a1 a0 b1 b0')
    x0, x1, x3 = symbols('x0 x1 x3')
    y0, y1, y3 = symbols('y0 y1 y3')

    # variables
    t, a3, a2, b3, b2, x2, y2 = symbols('t a3 a2 b3 b2 x2 y2')

    r1  = a3*t**3 + a2*t**2 + a1*t + a0 - x
    r2  = b3*t**3 + b2*t**2 + b1*t + b0 - y
    r3  = a3 + 3*x2 - x3 - 3*x1 + x0
    r4  = a2 - 3*x2 + 6*x1 - 3*x0
    r5  = b3 + 3*y2 - y3 - 3*y1 + y0
    r6  = b2 - 3*y2 + 6*y1 - 3*y0
    r7  = x0 - a0
    r8  = y0 - b0
    r9  = a1 - 3*x1 + 3*x0
    r10 = b1 - 3*y1 + 3*y0

    #r1 = r1.subs(x,x_)
    #r2 = r2.subs(y,y_)
    #r3 = r3.subs(x0,x0_).subs(x1,x1_).subs(x3,x3_)
    #r4 = r4.subs(x0,x0_).subs(x1,x1_)
    #r5 = r5.subs(y0,y0_).subs(y1,y1_).subs(y3,y3_)
    #r6 = r6.subs(y0,y0_).subs(y1,y1_)
    #r7 = r7.subs(x0,x0_)
    #r8 = r8.subs(y0,y0_)
    #r9 = r9.subs(x0,x0_).subs(x1,x1_)
    #r10 = r10.subs(y0,y0_).subs(y1,y1_)

    #print(r1)
    #print(r2)
    #print(r3)
    #print(r4)
    #print(r5)
    #print(r6)
    #print(r7)
    #print(r8)
    #print(r9)
    #print(r10)

    res = linsolve(
        [r1,r2,r3,r4,r5,r6,r7,r8,r9,r10], 
        a3, a2, a1, a0, b3, b2, b1, b0, x2, y2
    )

    # (2 - 3*t)/(t**2*(t - 1)), 
    # (3*t - 2)/(t**2*(t - 1)), 
    # (3*t**2 - 3*t + 2)/(t**2*(t - 1)), 
    # (-3*t**3 + 3*t - 2)/(t**2*(t - 1)), 
    # (2*t**3 - 2*t**2 + t - 2/3)/(t**2*(t - 1)), 
    # (t**3 - 2*t**2 + t - 2/3)/(t**2*(t - 1))

    print(res)
    return res


generateCubicThroughPointGiven013()
