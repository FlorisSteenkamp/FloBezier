from sympy import Poly, resultant, Symbol, symbols, sympify, expand, solve
from sympy import Matrix, det, binomial, linsolve, symbols, nonlinsolve
from sympy import resultant


def generateSelfIntersecting():
    # variables
    a3, a2, a1, b3, b2, b1 = symbols('a3 a2 a1 b3 b2 b1')
    t1, t2 = symbols('t1 t2')

    f4 = a2*b3 - a3*b2
    f5 = a1*b3 - a3*b1
    f6 = a2*b1 - a1*b2

    e1 = expand(f4**2*t1**2 + f4*f5*t1 + f4*f6 + f5**2)
    e2 = expand(f4**2*t2**2 + f4*f5*t2 + f4*f6 + f5**2)

    #r = linsolve([e1,e2], 0, 0)
  
    print(e1)
    print()
    print(e2)


def implicit_intersection_quadratic():
    x, y = symbols('x y')
    vxx, vyy, vxy, vx, vy, v = symbols('vxx vyy vxy vx vy v')
    wxx, wyy, wxy, wx, wy, w = symbols('wxx wyy wxy wx wy w')    

    Px1 = Poly(vxx*x*x + vxy*x*y + vyy*y*y + vx*x + vy*y + v, x)
    Px2 = Poly(wxx*x*x + wxy*x*y + wyy*y*y + wx*x + wy*y + w, x)

    Py1 = Poly(vxx*x*x + vxy*x*y + vyy*y*y + vx*x + vy*y + v, y)
    Py2 = Poly(wxx*x*x + wxy*x*y + wyy*y*y + wx*x + wy*y + w, y)
    
    Px = Poly(resultant(Px1,Px2),y)
    Py = Poly(resultant(Py1,Py2),x)

    print(Px)
    print()
    print(Py)

    # vxx**2*wyy**2 - vxx*vxy*wxy*wyy - 2*vxx*vyy*wxx*wyy + vxx*vyy*wxy**2 + vxy**2*wxx*wyy - vxy*vyy*wxx*wxy + vyy**2*wxx**2)*y**4 + (-vx*vxx*wxy*wyy + 2*vx*vxy*wxx*wyy - vx*vyy*wxx*wxy + 2*vxx**2*wy*wyy - vxx*vxy*wx*wyy - vxx*vxy*wxy*wy - 2*vxx*vy*wxx*wyy + vxx*vy*wxy**2 + 2*vxx*vyy*wx*wxy - 2*vxx*vyy*wxx*wy + vxy**2*wxx*wy - vxy*vy*wxx*wxy - vxy*vyy*wx*wxx + 2*vy*vyy*wxx**2)*y**3 + (-2*v*vxx*wxx*wyy + v*vxx*wxy**2 - v*vxy*wxx*wxy + 2*v*vyy*wxx**2 + vx**2*wxx*wyy - vx*vxx*wx*wyy - vx*vxx*wxy*wy + 2*vx*vxy*wxx*wy - vx*vy*wxx*wxy - vx*vyy*wx*wxx + 2*vxx**2*w*wyy + vxx**2*wy**2 - vxx*vxy*w*wxy - vxx*vxy*wx*wy + 2*vxx*vy*wx*wxy - 2*vxx*vy*wxx*wy - 2*vxx*vyy*w*wxx + vxx*vyy*wx**2 + vxy**2*w*wxx - vxy*vy*wx*wxx + vy**2*wxx**2)*y**2 + (-v*vx*wxx*wxy + 2*v*vxx*wx*wxy - 2*v*vxx*wxx*wy - v*vxy*wx*wxx + 2*v*vy*wxx**2 + vx**2*wxx*wy - vx*vxx*w*wxy - vx*vxx*wx*wy + 2*vx*vxy*w*wxx - vx*vy*wx*wxx + 2*vxx**2*w*wy - vxx*vxy*w*wx - 2*vxx*vy*w*wxx 
    #    + vxx*vy*wx**2)*y + v**2*wxx**2 - v*vx*wx*wxx - 2*v*vxx*w*wxx + v*vxx*wx**2 + vx**2*w*wxx - vx*vxx*w*wx + vxx**2*w**2


def implicit_intersection_line():
    x, y = symbols('x y')
    vx, vy, v = symbols('vx vy v')
    wx, wy, w = symbols('wx wy w')    

    Px1 = Poly(vx*x + vy*y + v, x)
    Px2 = Poly(wx*x + wy*y + w, x)

    Py1 = Poly(vx*x + vy*y + v, y)
    Py2 = Poly(wx*x + wy*y + w, y)
    
    Px = Poly(resultant(Px1,Px2),y)
    Py = Poly(resultant(Py1,Py2),x)

    print(Py)

    print()
    #print(Py)

    #return P

    # (vx*wy - vy*wx)*y - v*wx + vx*w = 0
    # (-vx*wy + vy*wx)*x - v*wy + vy*w = 0


#generateSelfIntersecting()
#implicit_intersection_line()
implicit_intersection_quadratic()

