
from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, linsolve, symbols, nonlinsolve
from sympy import diff, simplify, collect, factor, rem, pdiv


def getInflectionPoly_cubic():
    # constants
    x0, x1, x2, x3 = symbols('x0 x1 x2 x3')
    y0, y1, y2, y3 = symbols('y0 y1 y2 y3')

    dx2, dx1, dx0 = symbols('dx2 dx1 dx0')
    dy2, dy1, dy0 = symbols('dy2 dy1 dy0')

    ddx1, ddx0 = symbols('ddx1 ddx0')
    ddy1, ddy0 = symbols('ddy1 ddy0')

    dddx, dddy = symbols('dddx dddy')

    dxt, ddxt = symbols('dxt ddxt')
    dyt, ddyt = symbols('dyt ddyt')

    # variables
    t = symbols('t')

    # (x′′y′ − x′y′′)
    kk = ddxt*dyt - dxt*ddyt

    kk = kk.subs(dxt, dx2*t*t + dx1*t + dx0).subs(ddxt, ddx1*t + ddx0)
    kk = kk.subs(dyt, dy2*t*t + dy1*t + dy0).subs(ddyt, ddy1*t + ddy0)

    kk = kk.subs(dx2, 3*(x3 + 3*(x1 - x2) - x0))
    kk = kk.subs(dx1, 6*(x2 - 2*x1 + x0))
    kk = kk.subs(dx0, 3*(x1 - x0))
    kk = kk.subs(ddx1, 6*(x3 + 3*(x1 - x2) - x0))
    kk = kk.subs(ddx0, 6*(x2 - 2*x1 + x0))

    kk = kk.subs(dy2, 3*(y3 + 3*(y1 - y2) - y0))
    kk = kk.subs(dy1, 6*(y2 - 2*y1 + y0))
    kk = kk.subs(dy0, 3*(y1 - y0))
    kk = kk.subs(ddy1, 6*(y3 + 3*(y1 - y2) - y0))
    kk = kk.subs(ddy0, 6*(y2 - 2*y1 + y0))

    print(collect(expand(kk)/18,t))


getInflectionPoly_cubic()
