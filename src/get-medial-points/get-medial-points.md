 -----------------------
 Implementation details
 -----------------------
 Let p in ℝ² be fixed,
 Let q(t) = p + t⋅v, t ≥ 0 with v in ℝ² be a ray.
 Let b(s), s in [0,1], be the quadratic bezier in power basis:
   b(s) = a⋅s² + b⋅s + c,
   b'(s) = w(s) = w1⋅s + w0.

 Define u(s) := p - b(s).
 A medial candidate (s,t) must satisfy:

 1) Footpoint orthogonality (q(t) - b(s)) ⋅ b'(s) = 0
    i.e. (u(s) + t⋅v) ⋅ w(s) = 0
    -> C(s)⋅t + D(s) = 0.

 2) Equal-distance condition |q(t) - p| = |q(t) - b(s)|
    |t⋅v|² = |u(s) + t⋅v|²
    -> 2⋅(v⋅u(s))⋅t + |u(s)|² = 0
    -> A(s)⋅t + B(s) = 0.

 Eliminate t between the two linear equations in t:
   A(s)⋅t + B(s) = 0
   C(s)⋅t + D(s) = 0
 giving the scalar eliminant
   H(s) := A(s)⋅D(s) - B(s)⋅C(s) = 0,
 a polynomial of degree ≤ 5 in s.

 Solve H(s) = 0 on [0,1].
 For each root s, recover t by
   t = -B(s)/A(s)   (or fallback t = -D(s)/C(s) if A(s) ~ 0),