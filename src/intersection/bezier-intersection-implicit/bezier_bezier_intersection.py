
# This code is a modified version of code from 
# http://www.mare.ee/indrek/misc/2d.pdf

from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, collect, terms_gcd, factor

#import importlib
#from sys import path
#path.append('c:\\projects\\bezier')
#implicit_form = importlib.import_module('src.implicit-form.implicit_form')

'''
def implicit_cubic():
    x,y,t = map(Symbol, ['x','y','t'])
    a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    P1 = a3*t**3 + a2*t**2 + a1*t + a0 - x
    P2 = b3*t**3 + b2*t**2 + b1*t + b0 - y
    P = resultant(P1,P2,x,y)
    #print(P)
    return P


def cubic_cubic():
    x,y,t = map(Symbol, ['x','y','t'])
    #v_xxx,v_xxy,v_xyy,v_yyy = map(Symbol, ['v_xxx','v_xxy','v_xyy','v_yyy'])
    #v_xx,v_xy,v_yy,v_x,v_y,v_0 = map(Symbol, ['v_xx','v_xy','v_yy','v_x','v_y','v_0'])
    a3,a2,a1,a0 = map(Symbol, ['a3','a2','a1','a0'])
    b3,b2,b1,b0 = map(Symbol, ['b3','b2','b1','b0'])
    c3,c2,c1,c0 = map(Symbol, ['c3','c2','c1','c0'])
    d3,d2,d1,d0 = map(Symbol, ['d3','d2','d1','d0'])
    #P = v_xxx*x**3 + v_xxy*x**2*y + v_xyy*x*y**2 + v_yyy*y**3 + v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0
    #P = implicit_cubic()

    ###
    #x,y,t = map(Symbol, ['x','y','t'])
    #a3, a2, a1, a0 = map(Symbol, ['a3','a2','a1','a0'])
    #b3, b2, b1, b0 = map(Symbol, ['b3','b2','b1','b0'])
    P1 = Poly(c3*t**3 + c2*t**2 + c1*t + c0 - x, t)
    P2 = Poly(d3*t**3 + d2*t**2 + d1*t + d0 - y, t)
    P = Poly(resultant(P1,P2),x,y)
    ###

    X = a3*t**3 + a2*t**2 + a1*t + a0
    Y = b3*t**3 + b2*t**2 + b1*t + b0
    P = Poly(P.subs(x,X).subs(y,Y), t) 
    P = terms_gcd(P)
    
    #P = collect(P, t)
    print(P)
    return P
'''

def test1():
    P = cubic_cubic()
    P = factor(P)
    print(P)


def cubic_cubic():
    x,y,t = map(Symbol, ['x','y','t'])
    v_xxx,v_xxy,v_xyy,v_yyy = map(Symbol, ['v_xxx','v_xxy','v_xyy','v_yyy'])
    v_xx,v_xy,v_yy,v_x,v_y,v_0 = map(Symbol, ['v_xx','v_xy','v_yy','v_x','v_y','v_0'])
    c3,c2,c1,c0 = map(Symbol, ['c3','c2','c1','c0'])
    d3,d2,d1,d0 = map(Symbol, ['d3','d2','d1','d0'])
    P = v_xxx*x**3 + v_xxy*x**2*y + v_xyy*x*y**2 + v_yyy*y**3 + v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0
    X = c3*t**3 + c2*t**2 + c1*t + c0
    Y = d3*t**3 + d2*t**2 + d1*t + d0
    P = P.subs(x,X).subs(y,Y)
    P = collect(P, t)
    #P = collect(expand(P), t)
    #print(P)
    return P


def cubic_quad():
    x,y,t = map(Symbol, ['x','y','t'])
    P = sympify('v_xxx*x**3 + v_xxy*x**2*y + v_xyy*x*y**2 + v_yyy*y**3 + v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0')
    X = sympify('a2*t**2 + a1*t + a0')
    Y = sympify('b2*t**2 + b1*t + b0')
    P = Poly(P.subs(x, X).subs(y, Y), t)
    print(P)


def cubic_line():
    x,y,t = map(Symbol, ['x','y','t'])
    P = sympify('v_xxx*x**3 + v_xxy*x**2*y + v_xyy*x*y**2 + v_yyy*y**3 + v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0')
    X = sympify('a1*t + a0')
    Y = sympify('b1*t + b0')
    P = Poly(P.subs(x, X).subs(y, Y), t)
    print(P)


def quad_quad():
    x,y,t = map(Symbol, ['x','y','t'])
    P = sympify('v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0')
    X = sympify('a2*t**2 + a1*t + a0')
    Y = sympify('b2*t**2 + b1*t + b0')
    P = Poly(P.subs(x, X).subs(y, Y), t)
    print(P)

def quad_cubic():
    x,y,t = map(Symbol, ['x','y','t'])
    P = sympify('v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0')
    X = sympify('a3*t**3 + a2*t**2 + a1*t + a0')
    Y = sympify('b3*t**3 + b2*t**2 + b1*t + b0')
    P = Poly(P.subs(x, X).subs(y, Y), t)
    print(P)

def quad_line():
    x,y,t = map(Symbol, ['x','y','t'])
    P = sympify('v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0')
    X = sympify('a1*t + a0')
    Y = sympify('b1*t + b0')
    P = Poly(P.subs(x, X).subs(y, Y), t)
    print(P)

def line_cubic():
    x,y,t = map(Symbol, ['x','y','t'])
    P = sympify('v_x*x + v_y*y + v_0')
    X = sympify('a3*t**3 + a2*t**2 + a1*t + a0')
    Y = sympify('b3*t**3 + b2*t**2 + b1*t + b0')
    P = Poly(P.subs(x, X).subs(y, Y), t)
    print(P)

def line_quad():
    x,y,t = map(Symbol, ['x','y','t'])
    P = sympify('v_x*x + v_y*y + v_0')
    X = sympify('a2*t**2 + a1*t + a0')
    Y = sympify('b2*t**2 + b1*t + b0')
    P = Poly(P.subs(x, X).subs(y, Y), t)
    print(P)

def line_line():
    x,y,t = map(Symbol, ['x','y','t'])
    P = sympify('v_x*x + v_y*y + v_0')
    X = sympify('a1*t + a0')
    Y = sympify('b1*t + b0')
    P = Poly(P.subs(x, X).subs(y, Y), t)
    print(P)


test1()
#implicit_cubic()
#cubic_cubic()
#cubic_quad()
#cubic_line()
#quad_cubic()
#quad_quad()
#quad_line()
#line_cubic()
#line_quad()
#line_line()

#implicit_form.implicit_bz_cubic()
#implicit_form.implicit_bz_quadratic()
#implicit_form.implicit_bz_linear()