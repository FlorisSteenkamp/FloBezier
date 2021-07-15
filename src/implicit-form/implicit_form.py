# This code is a modified version of code from 
# http://www.mare.ee/indrek/misc/2d.pdf

from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, factor, collect, terms_gcd
from sympy import simplify


def impl_quad():
    x,y,t = map(Symbol, ['x','y','t'])

    q1, q2, q3 = map(Symbol, ['q1','q2','q3'])
    r1, r2 = map(Symbol, ['r1','r2'])
    R1R1, R1R2, Q1R1 = map(Symbol, ['R1R1','R1R2','Q1R1'])

    a2, a1, a0 = map(Symbol, ['a2','a1','a0'])
    b2, b1, b0 = map(Symbol, ['b2','b1','b0'])
    #c2, c1, c0 = map(Symbol, ['c2','c1','c0'])
    #d2, d1, d0 = map(Symbol, ['d2','d1','d0'])

    Q1 = a2*b1 - a1*b2
    Q2 = a2*b0 - a0*b2
    Q3 = a1*b0 - a0*b1

    R1 = b1*x - a1*y
    R2 = b2*x - a2*y

    M = Matrix([
        [q1,    q2+r2],
        [q2+r2, q3+r1]
    ])

    
    m = det(M)
    #m = expand(m)

    R1R1 = R1*R1
    #print(R1R1)
    R1R1 = expand(R1R1)
    #print(R1R1)

    print(m)
    print()
    m = expand(m)

    print(m)
    print()
    m = m.subs(r1,R1).subs(r2,R2)
    #m = m.subs(q1,Q1).subs(q2,Q2).subs(q3,Q3)

    m = expand(m)
    print(m)
    
    #X = c3*t**3 + c2*t**2 + c1*t + c0
    #Y = d3*t**3 + d2*t**2 + d1*t + d0
    #m = m.subs(x,X).subs(y,Y)

    #print(m)
    return M


def test4():
    x,y,t = map(Symbol, ['x','y','t'])
    q6, q5, q4, q3, q2, q1 = map(Symbol, ['q6','q5','q4','q3','q2','q1'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    d7, d6, d5, d4 = map(Symbol, ['d7','d6','d5','d4'])
    d3, d2, d1, d0 = map(Symbol, ['d3','d2','d1','d0'])
    a3b0, a0b3 = map(Symbol, ['a3b0', 'a0b3'])
    a2b1, a1b2 = map(Symbol, ['a2b1', 'a1b2'])
    a, b, c, d = map(Symbol, ['a','b','c','d'])

    P = ((a*b)*(1+d1) + (c*d)*(1+d2))*(1+d3)
    #print(P)
    P = expand(P)
    print(P)
    print(expand(a*b + c*d))
    return P    


def test3():
    x,y,t = map(Symbol, ['x','y','t'])
    q6, q5, q4, q3, q2, q1 = map(Symbol, ['q6','q5','q4','q3','q2','q1'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    d7, d6, d5, d4 = map(Symbol, ['d7','d6','d5','d4'])
    d3, d2, d1, d0 = map(Symbol, ['d3','d2','d1','d0'])
    a3b0, a0b3 = map(Symbol, ['a3b0', 'a0b3'])
    a2b1, a1b2 = map(Symbol, ['a2b1', 'a1b2'])
    a, b, c, d = map(Symbol, ['a','b','c','d'])

    P = (((a + b)*(1+d1)) * ((c + d)*(1+d2)))*(1+d3)
    P = expand(P)
    print(expand((a+b)*(c+d)))
    print(P)
    return P    

def test2():
    x,y,t = map(Symbol, ['x','y','t'])
    q6, q5, q4, q3, q2, q1 = map(Symbol, ['q6','q5','q4','q3','q2','q1'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    d7, d6, d5, d4 = map(Symbol, ['d7','d6','d5','d4'])
    d3, d2, d1, d0 = map(Symbol, ['d3','d2','d1','d0'])

    a3b0, a0b3 = map(Symbol, ['a3b0', 'a0b3'])
    a2b1, a1b2 = map(Symbol, ['a2b1', 'a1b2'])

    P = ((3*q1)*(1+d5) + q5)*(1+d6)
    P_ = 3*q1 + q5

    Q1 = (a3b0)*(1+d1) + (a0b3)*(1+d2)
    Q5 = (a2b1)*(1+d3) + (a1b2)*(1+d4)

    Q1_ = a3b0 + a0b3
    Q5_ = a2b1 + a1b2

    P = P.subs(q1,Q1).subs(q5,Q5)
    P_ = P_.subs(q1,Q1_).subs(q5,Q5_)

    P = expand(P)
    P_ = expand(P_)

    ######
    # 3*(a0b3 + a3b0) + a1b2 + a2b1
    #  
    # a1b2*(d4 + d6) + a2b1*(d3 + d6) + 
    # 3*(a0b3*(d2 + d5 + d6) +
    #    a3b0*(d1 + d5 + d6))
    # 
    # a1b2*d2 + a2b1*d2 + 
    # 3*(a0b3*d3 + a3b0*d3)
    ######

    print(P)
    print(P_)
    return P    


def test():
    x,y,t = map(Symbol, ['x','y','t'])

    q6, q5, q4, q3, q2, q1 = map(Symbol, ['q6','q5','q4','q3','q2','q1'])
    r6, r4, r1 = map(Symbol, ['r6','r4','r1'])
    R1R1, R1R1R1, R1R6, Q1Q1R1 = map(Symbol, ['R1R1', 'R1R1R1','R1R6', 'Q1Q1R1'])

    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    c3, c2, c1, c0 = map(Symbol, ['c3','c2','c1','c0'])
    d3, d2, d1, d0 = map(Symbol, ['d3','d2','d1','d0'])

    M = Matrix([
        [q3,q2,q1+r1], 
        [q2,q1+r1+q5,q4+r4], 
        [q1+r1,q4+r4,q6+r6]
    ])

    m = det(M)
    m = expand(m)

    R1 = b3*x - a3*y
    R4 = b2*x - a2*y
    R6 = b1*x - a1*y

    R1R1 = R1*R1
    #print(R1R1)
    R1R1 = expand(R1R1)
    #print(R1R1)

    R1R1R1 = R1R1*R1
    #print(R1R1R1)
    R1R1R1 = expand(R1R1R1)
    #print(R1R1R1)

    R4R4 = R4*R4
    #print(R4R4)
    R4R4 = expand(R4R4)
    #print(R4R4)

    R1R4 = R1*R4
    #print(R1R4)
    R1R4 = expand(R1R4)
    #print(R1R4)

    R1R6 = R1*R6
    #print(R1R6)
    R1R6 = expand(R1R6)
    print(R1R6)

    #m = m.subs(r1,R1).subs(r4,R4).subs(r6,R6)

    Q1 = a3*b0 - a0*b3
    Q2 = a3*b1 - a1*b3
    Q3 = a3*b2 - a2*b3
    Q4 = a2*b0 - a0*b2
    Q5 = a2*b1 - a1*b2
    Q6 = a1*b0 - a0*b1

    Q1Q1R1 = Q1*Q1*R1
    #print(Q1Q1R1)
    Q1Q1R1 = expand(Q1Q1R1)
    #print(Q1Q1R1)

    #m = m.subs(q1,Q1).subs(q2,Q2).subs(q3,Q3).subs(q4,Q4).subs(q5,Q5).subs(q6,Q6)
    
    X = c3*t**3 + c2*t**2 + c1*t + c0
    Y = d3*t**3 + d2*t**2 + d1*t + d0
    #m = m.subs(x,X).subs(y,Y)

    #print(m)
    return M


'''
def test():
    x,y,t = map(Symbol, ['x','y','t'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    P1 = Poly(a3*t**3 + a2*t**2 + a1*t + a0 - x, t)
    P2 = Poly(b3*t**3 + b2*t**2 + b1*t + b0 - y, t)
    P = Poly(resultant(P1,P2),x,y)
    
    print(P)
    return P
'''

'''
def test():
    x,y,t = map(Symbol, ['x','y','t'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])

    P = Poly(a1*a3*b2*b3 + a2*a3*b1*b3 + 6*b0*b3*a3*a3 + 3*a1*a2*b3*b3 + 2*a2*a3*b2*b2 + 2*b2*b3*a2*a2 + 3*b1*b2*a3*a3 + 6*a0*a3*b3*b3)

    #P = simplify(P)
    #P = factor(factor(P,a3),a2)
    #P = factor(P)
    #P = collect(P,a3)

    print(P)
    return P
'''

'''
def test():
    x,y,t = map(Symbol, ['x','y','t'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    P1 = Poly(a3*t**3 + a2*t**2 + a1*t + a0 - x, t)
    P2 = Poly(b3*t**3 + b2*t**2 + b1*t + b0 - y, t)
    P = Poly(resultant(P1,P2),x,y)
    
    Q = collect(P,x*y)
    R = Q.coeff(x*y)
    #P = factor(P)

    print(Q)
    #print(R)
    #print(P)
    return P
'''

def implicit_cubic():
    x,y,t = map(Symbol, ['x','y','t'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    P1 = Poly(a3*t**3 + a2*t**2 + a1*t + a0 - x, t)
    P2 = Poly(b3*t**3 + b2*t**2 + b1*t + b0 - y, t)
    P = Poly(resultant(P1,P2),x,y)
    
    #print(P)
    return P


def implicit_quadratic():
    x,y,t = map(Symbol, ['x','y','t'])
    a2, a1, a0 = map(Symbol, ['a2','a1','a0'])
    b2, b1, b0 = map(Symbol, ['b2','b1','b0'])
    P1 = Poly(a2*t**2 + a1*t + a0 - x, t)
    P2 = Poly(b2*t**2 + b1*t + b0 - y, t)
    P = Poly(resultant(P1,P2),x,y)

    print(P)
    return P


def implicit_linear():
    x,y,t = map(Symbol, ['x','y','t'])
    a1, a0 = map(Symbol, ['a1','a0'])
    b1, b0 = map(Symbol, ['b1','b0'])
    P1 = Poly(a1*t + a0 - x, t)
    P2 = Poly(b1*t + b0 - y, t)
    P = Poly(resultant(P1,P2),x,y)

    print(P)
    return P


#test()
#test2()
#test3()
#test4()
impl_quad()
#implicit_cubic()
#implicit_quadratic()
#implicit_linear()



#(a*c + a*d + b*d + b*c)(1 + (d1 + d2 + d3) + (d1*d2 + d1*d3 + d2*d3) + d1*d2*d3)
#
#((a+b)*(c+d))
#(d1*d2*d3)* ((a+b)*(c+d))
#(d1*d2 + d1*d3 + d2*d3)* ((a+b)*(c+d))
#(d1 + d2 + d3)* ((a+b)*(c+d))


#a*b*d1*d3 + c*d*d2*d3 + 
#a*b(d1 + d3) + c*d(d2 + d3) + 
#a*b + c*d