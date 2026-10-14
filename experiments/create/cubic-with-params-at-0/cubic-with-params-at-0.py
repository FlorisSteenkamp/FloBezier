
from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, factor, collect, terms_gcd
from sympy import simplify, diff, Function


def w():
    t, s = map(Symbol, ['t', 's'])
    x0,x1,x2,x3 = map(Symbol, ['x0','x1','x2','x3'])
    y0,y1,y2,y3 = map(Symbol, ['y0','y1','y2','y3'])

    x = ((x3 - x0) + 3*(x1 - x2))*t**3 + 3*((x2 + x0) - 2*x1)*t**2 + 3*(x1 - x0)*t + x0
    y = ((y3 - y0) + 3*(y1 - y2))*t**3 + 3*((y2 + y0) - 2*y1)*t**2 + 3*(y1 - y0)*t + y0

    #x = Function('x')(t)
    #y = Function('y')(t)
    #print(diff(x,t))

    dx = diff(x,t)
    dy = diff(y,t)

    ddx = diff(dx,t)
    ddy = diff(dy,t)

    ds_dt = (dx**2 + dy**2)**(1/2)
    dt_ds = (dx**2 + dy**2)**(-1/2)
    
    ddt_dss = diff(dt_ds,t) * dt_ds

    d__dt_ds__dt = diff(dt_ds,t)
    d__dt_ds__dt0 = d__dt_ds__dt.subs(t,0)
    #print(d__dt_ds__dt0)
    

    d__ddt_dss__dt = diff(ddt_dss,t)
    d__ddt_dss__dt = d__ddt_dss__dt.subs(t,0)
    print(d__ddt_dss__dt)

    k = (dx*ddy - dy*ddx) / (dx**2 + dy**2)**(3/2)
    #kk = k*k

    dds_dtt = (dx*ddx + dy*ddy)/(dx**2 + dy**2)**(1/2)

    #print(dds_dtt0)

    # dk/ds = (dk/dt) / (ds/dt)
    dk_dt = diff(k,t)
    ddk_dt = diff(dk_dt,t)
    dddk_dt = diff(ddk_dt,t)

    dk_ds = dk_dt * dt_ds

    ddk_dss = diff(dk_ds,t) * dt_ds

    ddt_dss0 = ddt_dss.subs(t,0)
    #print(ddt_dss0)

    #print(ddk_dss0)

    k0 = k.subs(t,0)

    ddk_dss0 = ddk_dss.subs(t,0)
    #print(ddk_dss0)

    dk_ds0 = dk_ds.subs(t,0)
    #print(dk_ds0)

  
    #kk0 = kk.subs(t,0)

    dk_dt0 = dk_dt.subs(t,0)
    ddk_dt0 = ddk_dt.subs(t,0)
    dddk_dt0 = dddk_dt.subs(t,0)

    dds_dtt0 = dds_dtt.subs(t,0)

    #print(dk0)

#w()



def vv():
    x2,y2,x3,y3,xa,xb,xc,ya,yb,yc,xy = map(Symbol, ['x2','y2','x3','y3','xa','xb','xc','ya','yb','yc','xy'])
    xyn15,xyn25,xyn35,xyn45 = map(Symbol, ['xyn15','xyn25','xyn35','xyn45'])

    xa*xa + ya*ya

    a = (1/9)*( \
        40*(xa*(xb + x2) + ya*(yb + y2))**2 * \
           (xa*(yb + y2) - ya*(xb + x2)) * \
           xyn45 \
        + xyn35 * ( \
            -8*(xa*(xb + x2) + ya*(yb + y2)) * \
            (ya*(xc + 3*x2 - x3) - xa*(yc + 3*y2 - y3)) \
            +  \
            4*(xa*(yb + y2) - ya*(xb + x2)) *  \
            (xa*(xc + 3*x2 - x3) + ya*(yc + 3*y2 - y3) - 2*(xb + x2)**2 - 2*(yb + y2)**2) \
            ) \
        +  \
        (4/3) * \
        ((yb + y2)*(xc + 3*x2 - x3) - (xb + x2)*(yc + 3*y2 - y3)) * \
        xyn25 \
        + \
            ( \
            -4*(xa*(xb + x2) + ya*(yb + y2)) *  \
            (xa*(yb + y2) - ya*(xb + x2)) *  \
            xyn45 \
            +  \
            (2/3)*xyn35 *  \
                (ya*(xc + 3*x2 - x3) - \
                xa*(yc + 3*y2 - y3)) \
        ) *  \
        (-2*(xa*(xb + x2) + ya*(yb + y2))) \
        )


    '''
    a = 40*(xa*(xb + x2) + ya*(yb + y2))**2 *  \
           (xa*(yb + y2) - ya*(xb + x2)) * \
           xyn35 \
        +  \
        xyn25 * ( \
            -8*(xa*(xb + x2) + ya*(yb + y2)) * \
            (ya*(xc + 3*x2 - x3) - xa*(yc + 3*y2 - y3)) \
            +  \
            4*(xa*(yb + y2) - ya*(xb + x2)) *  \
            (xa*(xc + 3*x2 - x3) + ya*(yc + 3*y2 - y3) - 2*(xb + x2)**2 - 2*(yb + y2)**2) \
            ) \
        +  \
        (4/3) * \
        ((yb + y2)*(xc + 3*x2 - x3) - (xb + x2)*(yc + 3*y2 - y3)) * \
        xyn15
    '''
    
    a = sympify(expand(a))

    print(a)


vv()





