
# This code is a modified version of code from 
# http://www.mare.ee/indrek/misc/2d.pdf

from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial

import importlib
from sys import path
path.append('c:\\projects\\bezier')
implicit_form = importlib.import_module('src.implicit-form.implicit_form')

implicit_bz_cubic = implicit_form.implicit_bz_cubic


def circle_bz_cubic():
    x = Symbol('x')
    y = Symbol('y')
    t = Symbol('t')
    P = sympify('(x-cx)**2 + (y-cy)**2 - r**2')
    X = sympify('a3*t**3 + a2*t**2 + a1*t + a0')
    Y = sympify('b3*t**3 + b2*t**2 + b1*t + b0')
    P = Poly(P.subs(x,X).subs(y,Y), t)
    print(P)

def circle_bz_cubic_bernstein():
    # todo - finish
    print(P)    

def circle_bz_quadratic():
    x = Symbol('x')
    y = Symbol('y')
    t = Symbol('t')
    P = sympify('(x-cx)**2 + (y-cy)**2 - r**2')
    X = sympify('a2*t**2 + a1*t + a0')
    Y = sympify('b2*t**2 + b1*t + b0')
    P = Poly(P.subs(x,X).subs(y,Y), t)
    print(P)

def circle_bz_line():
    x = Symbol('x')
    y = Symbol('y')
    t = Symbol('t')
    P = sympify('(x-cx)**2 + (y-cy)**2 - r**2')
    X = sympify('a1*t + a0')
    Y = sympify('b1*t + b0')
    P = Poly(P.subs(x,X).subs(y,Y), t)
    print(P)    


#circle_bz_cubic()
#circle_bz_quadratic()
circle_bz_line()