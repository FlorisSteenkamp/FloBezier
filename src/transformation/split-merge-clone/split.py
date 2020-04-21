
from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial


def run():
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])

    x,y,t1,t2 = map(Symbol, ['x','y','t1','t2'])
    x0,x1,x2,x3 = map(Symbol, ['x0','x1','x2','x3'])

    _x0 = x3*t1**3 + 3*x2*(1-t1)*t1**2 + 3*x1*(1-t1)**2*t1 + x0*(1-t1)**3
    _x1 = x3*t1**2 + 2*x2*t1*(1-t1) + x1*(1-t1)**2
    _x2 = x3*t1 + x2*(1-t1)
    _x3 = x3

    t2 = (t2-t1)/(1-t1)
    
    x0_ = _x0
    x1_ = _x1*t2 + _x0*(1-t2)
    x2_ = _x2*t2**2 + 2*_x1*(1-t2)*t2 + _x0*(1-t2)**2
    x3_ = _x3*t2**3 + 3*_x2*(1-t2)*t2**2 + 3*_x1*(1-t2)**2*t2 + _x0*(1-t2)**3

    #splitAt(splitAt(ps, t1)[1], (t2-t1)/(1-t1))[0]

    p = [x0_, x1_, x2_, x3_]

    print(p)


def test():
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])

    t,x0,x1,x2,x3 = map(Symbol, ['t','x0','x1','x2','x3'])

    x = x3*t**3 + 3*x2*(1-t)*t**2 + 3*x1*(1-t)**2*t + x0*(1-t)**3

    print(x)


#test()
run()
