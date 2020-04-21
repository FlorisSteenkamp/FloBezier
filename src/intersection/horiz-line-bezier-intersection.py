
# This code is a modified version of code from 
# http://www.mare.ee/indrek/misc/2d.pdf

from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial

import importlib
from sys import path
path.append('c:\\projects\\bezier')
implicit_form = importlib.import_module('src.implicit-form.implicit_form')

#implicit_bz_cubic = implicit_form.implicit_bz_cubic


def horiz_line_bz_cubic():
    x = Symbol('x')
    y = Symbol('y')
    t = Symbol('t')
    P = sympify('v_xxx*x**3 + v_xxy*x**2*y + v_xyy*x*y**2 + v_yyy*y**3 + v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0')
    Y = sympify('y0')
    P = Poly(P.subs(y,Y), x)
    print(P)
    return P

def horiz_line_bz_quadratic():
    x = Symbol('x')
    y = Symbol('y')
    t = Symbol('t')
    P = sympify('v_xx*x**2 + v_xy*x*y + v_yy*y**2 + v_x*x + v_y*y + v_0')
    Y = sympify('y0')
    P = Poly(P.subs(y,Y), x)
    print(P)
    return P

def horiz_line_bz_line():
    x = Symbol('x')
    y = Symbol('y')
    t = Symbol('t')
    P = sympify('v_x*x + v_y*y + v_0')
    Y = sympify('y0')
    P = Poly(P.subs(y,Y), x)
    print(P)
    return P

    

#horiz_line_bz_cubic()
#horiz_line_bz_quadratic()
horiz_line_bz_line()