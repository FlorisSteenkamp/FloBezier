
from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, factor, collect, terms_gcd
from sympy import simplify, diff


def c():
    #x,y,t = map(Symbol, ['x','y','t'])

    t,s = map(Symbol, ['t', 's'])
    x10,x11,x12,x13 = map(Symbol, ['x10','x11','x12','x13'])
    y10,y11,y12,y13 = map(Symbol, ['y10','y11','y12','y13'])
    #x20,x21,x22,x23 = map(Symbol, ['x20','x21','x22','x23'])
    #y20,y21,y22,y23 = map(Symbol, ['y20','y21','y22','y23'])

    #dx1 = 3*(x1 - x0)
    #dy1 = 3*(y1 - y0)

    x1 = ((x13 - x10) + 3*(x11 - x12))*t**3 + 3*((x12 + x10) - 2*x11)*t**2 + 3*(x11 - x10)*t + x10
    y1 = ((y13 - y10) + 3*(y11 - y12))*t**3 + 3*((y12 + y10) - 2*y11)*t**2 + 3*(y11 - y10)*t + y10
    #x2 = ((x23 - x20) + 3*(x21 - x22))*t**3 + 3*((x22 + x20) - 2*x21)*t**2 + 3*(x21 - x20)*t + x20
    #y2 = ((y23 - y20) + 3*(y21 - y22))*t**3 + 3*((y22 + y20) - 2*y21)*t**2 + 3*(y21 - y20)*t + y20

    #x1 = x1.subs(x11,x10)
    #y1 = y1.subs(y11,y10)

    dx1 = diff(x1,t)
    dy1 = diff(y1,t)
    #dx2 = diff(x2,t)
    #dy2 = diff(y2,t)

    ddx1 = diff(dx1,t)
    ddy1 = diff(dy1,t)
    #ddx2 = diff(dx2,t)
    #ddy2 = diff(dy2,t)

    #k1 = (dx1*ddy1 - dy1*ddx1) / (dx1**2 + dy1**2)**(3/2)
    #dk1 = diff(k1,t)

    #k1 = k1.subs(t,0.0625)
    #dk1 = dk1.subs(t,0.000005)
    #print(dk1)

    print(dx1)
    print(ddx1)
    k1s = (dx1*ddy1 - dy1*ddx1)**2 / (dx1**2 + dy1**2)**3
    #sympify(k1s)
    #print(k1s)

    #dx1 = dx1.subs(t,0)
    #dy1 = dy1.subs(t,0)
    #dx2 = dx1.subs(t,0)
    #dy2 = dy1.subs(t,0)

    #ddx1 = ddx1.subs(t,0)
    #ddy1 = ddy1.subs(t,0)
    #ddx2 = ddx1.subs(t,0)
    #ddy2 = ddy1.subs(t,0)

    #print(dx1_0)
    #print(dx1_0)

    #dk1 = diff()

    #k1a  = k1.subs(x10,5).subs(x11,5).subs(y10,7).subs(y11,7)
    #k1a  = k1a.subs(x12,5).subs(x13,15).subs(y12,7).subs(y13,17)
    #print(k1a)

    k1sa = k1s
    k1sa = k1sa.subs(x10,0).subs(y10,0)
    k1sa = k1sa.subs(x11,0).subs(y11,0)
    k1sa = k1sa.subs(x12,1).subs(y12,0)
    k1sa = k1sa.subs(x13,1).subs(y13,1)

    #k1sa = expand(k1sa)
    #print(k1sa)

    #k1sa = k1sa.subs(t,t**-10)
    #k1sa = k1sa.subs(t,0.125)

    k1sa = sympify(k1sa)
    k1sa = expand(k1sa)

    print(k1sa)

    #dk1a = dk1.subs(x10,5).subs(x11,5).subs(y10,7).subs(y11,7)
    #dk1a  = dk1a.subs(x12,8).subs(x13,15).subs(y12,-3).subs(y13,17)
    #print(dk1a)

    

    #R1R1 = expand(R1R1)
    #m = m.subs(r1,R1).subs(r2,R2)

    #m = expand(m)

    #print(m)

    #return c


c()