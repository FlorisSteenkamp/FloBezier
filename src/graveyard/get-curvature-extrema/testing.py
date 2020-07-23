# this was an initial attempt to minimize multivariate Horner evaluation

import numpy as np
from multivar_horner.multivar_horner import HornerMultivarPolynomial
from multivar_horner.multivar_horner import num_monomials

# dddx*dx2**2*dy2 + dddx*dy2**3 - dddy*dx2**3 - dddy*dx2*dy2**2 - 
# 3*ddx1**2*dx2*dy2 + 3*ddx1*ddy1*dx2**2 - 3*ddx1*ddy1*dy2**2 + 3*ddy1**2*dx2*dy2

coefficients = [1, 1, -1, -1, -3, 3, -3, 3]
# dddx,dddy,ddx1,ddy1,dx2,dy2
exponents = [
    [1, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 3],
    [0, 1, 0, 0, 3, 0],
    [0, 1, 0, 0, 1, 2],
    [0, 0, 2, 0, 1, 1],
    [0, 0, 1, 1, 2, 0],
    [0, 0, 1, 1, 0, 2],
    [0, 0, 0, 2, 1, 1]]

p = HornerMultivarPolynomial(
    coefficients, exponents, 
    rectify_input=True, validate_input=True, 
    keep_tree=True, compute_representation=True,
    find_optimal=True
)

print(p)

# dddx,dddy,ddx1,ddy1,dx2,dy2
# dx2 (dy2 (dddx (1.0 dx2) + dddy (-1.0 dy2) + ddx1^2 (-3.0) + 3.0 ddy1^2) + dx2 (dddy (-1.0 dx2) + 3.0 ddx1 ddy1)) + dy2^2 (dddx (1.0 dy2) + -3.0 ddx1 ddy1)
# dx2*(dy2*(dddx*dx2 - dddy*dy2 + -3*ddx1^2 + 3*ddy1^2) + dx2*(-dddy*dx2 + 3*ddx1*ddy1)) + dy2^2*(dddx*dy2 -3*ddx1*ddy1)

# dx2*(dy2*(dddx*dx2 - dddy*dy2 + -3*ddx1^2 + 3*ddy1^2) + dx2*(-dddy*dx2 + 3*ddx1*ddy1)) + dy2^2*(dddx*dy2 -3*ddx1*ddy1)


