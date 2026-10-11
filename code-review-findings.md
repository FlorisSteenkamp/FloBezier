# Code review findings — src/ (2026-10-10)

Consolidated review of the entire `src` folder. No code was changed. Items are
ranked roughly by impact within each section. Remove items as they are resolved.

Suggested order: items 1–8 and 16–25 first (change results or break certified
bounds), then 31–37 (quick cleanup that also shrinks the published package).

---

## Bugs

### Error bounds that are not actually bounds

(results stay correct except in near-degenerate cases, where "certified" claims fail)

19. `src/implicit-form/double-double/get-implicit-form3-dd-with-running-error.ts:372` — `_s3*_q6` should be `_s3*q6_` (the double sibling at line 314 is right). Lines 372, 376, 381 also use the single-`abs` convention for dd×dd products. The constant-term bound `v_` is under-estimated.

20. `src/transformation/split/from-to/from-to-2-incl-error-bound.ts:110` — `_yy1 = 0` hard-coded; should be `_t*_yB + _y1`. And line 303 uses signed `yC` instead of `_yC`. Both feed `getIntervalBox` for quadratics.

21. `src/global-properties/bounds/get-interval-box/get-interval-box-dd.ts:270,294` — `_tt2*x2` uses the signed coordinate; the bound can go negative for negative coordinates.

23. `src/simultaneous-properties/closest-and-furthest-point-on-bezier/root-interval-to-distance-squared-interval.ts:32-65` — Lower bound is distance to the nearest *corner*; the true minimum is on an edge or 0 inside the box. `closestPointOnBezierCertified` on a point lying on the curve returns an interval excluding 0 (verified).

24. `src/intersection/circle-bezier-intersection/circle-bezier-intersection.ts:59` — `2*e` drops the Stewart error counter (up to 9 for cubics) that the convention requires; bound is under-stated by 2x to 4.5x. Git history shows it was `γγ6*e` before the switch to `roots`.

25. `src/intersection/self-intersection/get-coefficients/double/get-coeffs-bez3-with-running-error.ts:28,58-61` — Destructure discards the nonzero error of `a1`/`b1`, so `u1_`/`u0_` miss four terms. The dd sibling includes them. Self-intersection pre-filter can give false negatives.

26. `src/global-properties/bounds/get-interval-box/get-interval-box.ts:194-198` and `get-interval-box-dd.ts:428-432` — Uses counters 8/5/2 where `evalDeCasteljauError` documents 9/6/3. Could just call `evalDeCasteljauWithErr`.

27. `src/transformation/split/from-to-incl-error-bound.ts:9-10` — Public JSDoc says multiply by `8u` for cubics, but one-sided splits produce `<9>` counters and the internal consumer uses `9u`.

28. `src/global-properties/classification/is-quad-really-line.ts:35,47` — Fast filter `abs(w) - w_ > 0` is never true because `u` was never applied. Results stay correct but every collinear quad takes the slow exact path.

29. `src/global-properties/bounds/get-interval-box/get-interval-box-dd.ts:366-379` — Line variant scales with `u` while quad/cubic use `uu`; the dd box for lines is 2^52 times looser than intended.

---

## Improvements

### Dead code and files that ship with the package

(package.json `files` includes `src`)

33. `src/intersection/bezier-bezier-intersection/get-coefficients/double/` — Whole directory unreferenced; two files fully commented out, family incomplete, (item 30's error-bound bugs in `get-coeffs-bez3-bez3.ts` are now fixed). Note: `performance/src/naive/-naive.ts` still imports `get-coeffs-bez3-bez3.ts`.

34. `src/transformation/split/split-by-deviation-from-straigh-line.ts` — Not exported, imports lack `.js` so would fail under ESM if wired in.

35. `src/intersection/self-intersection/get-coefficients/double/get-coeffs-bez3.ts` and `.../double-double/get-coeffs-bez3-dd.ts` — Neither imported anywhere.

39. Dead helpers: `distanceCompareMaxAsc` and `getMaxDistance` in closest-distance-between-beziers, `popMax` and the static index helpers in `src/simultaneous-properties/heap.ts` (`popMax` on empty heap also throws RangeError).

### Structural / API

49. `toPowerBasis1DdWithRunningError` (`src/to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.ts:175-186`) returns a bare array, unlike its degree-2/3 siblings. `src/implicit-form/double-double/get-implicit-form1-dd-with-running-error.ts:63` returns only `v_` though the shared type requires three fields.

**Status: won't fix.** Changing `toPowerBasis1DdWithRunningError`'s return shape would break downstream users. `getImplicitForm1DdWithRunningError`'s missing `vₓ_`/`vᵧ_` are always zero (the line's coefficients are computed exactly).

50. `getMedialPoints` (`src/get-medial-points/double/get-medial-points.ts:88`) throws for points while the dispatcher and Bez0 files support them; `chooseStableT`'s optional params are dead as a result. Order ≥5 fails with an opaque TypeError in both dispatchers.

51. `generateArcFromCubics` and `generateArcFromQuads` are ~95% identical (only the `circle` pieces and the angle step `π/2` vs `π/4` differ); factor into one internal helper. Module-level `c` (`generate-arc-from-cubics.ts:11`) is shadowed by the parameter `c` (`:46`); rename the constant.

52. Public identifiers `splitByDeviationFromStraighLine_Quad/_Cubic` (`src/index.ts:221-222`) and two filenames have the typo "Straigh".

53. `src/local-properties-to-t/t-from-xy.ts:330,338` — `combineRoots` uses `max(tE)` (union) where the intersection is valid and tighter; case 2 returns `tS` as the estimate instead of `t`. Lines 188/198 `pop()` cached arrays in place unlike `tFromXY3`.

54. `evalDeCasteljau`/`evaluate` (`src/local-properties-at-t/evaluate/double/eval-de-casteljau.ts:21,23,70`, `evaluate.ts:26-27`, `eval-de-casteljau-with-err.ts:44`) return the caller's control-point array itself at t = 0/1 (aliasing in a "purely functional" library).

55. Double/dd `getImplicitForm2/3` silently return all zeros for degenerate curves while exact variants fall back to lower degree; undocumented.

56. `tolerance || default` in `closest-points-between-beziers.ts:106`, `hausdorff-distance-one-sided-extra.ts:90` and `quadratic-to-polyline.ts:23` treats an explicit 0 as "use default".

57. `src/simultaneous-properties/is-point-on-bezier-extension/is-point-on-bezier-extension-{1,2,3}.ts` (lines 100, 188, 256) all-coincident branch rejects uncompressed expansions that equal the point; the order-0 branch correctly compresses first.

58. `get-abs-curvature-extrema-polys*.ts` (double :146,152; dd :304,313; e :304,313) — `r3` is identically zero in all three variants (ddx1 === 2·dx2 exactly), so the inflection poly is really a quadratic.

59. Quokka leftovers: `//?` at `src/get-medial-points/double/get-medial-points.ts:94`, commented test after export in `tangent-at-0.ts:53-54`, trailing `// Quokka tests` at `to-power-basis-error-counters.ts:193`.

60. No tests exist for the seven `ddGetMedialPointCoeffs*` functions.

### Stale or wrong JSDoc

61. `src/simultaneous-properties/hausdorff-distance/hausdorff-distance.ts:5-8` says it returns `[min,max]`; it returns a number.

62. `src/intersection/bezier-bezier-intersection/get-coefficients/get-coeffs-bez-bez.ts:46` says `undefined` is returned for infinite intersections; it never is.

63. `src/to-power-basis/to-power-basis-1st-derivative/to-power-basis-1st-derivative-error-counters.ts:31-64` — `D` is documented inverted (0 for double, 1 for dd); the cubic `X0` counter is listed as D+3 but is D+1.

64. Double `src/implicit-form/double/get-implicit-form{1,2,3}-with-running-error.ts` say "double-double precision" and `γγ1`/`γγ3`; should be `γ1`. Same copy-paste in the dead double get-coefficients directory.

65. `src/fit/fit-quads-to-cubic.ts:13-15` and `fit-quads-to-cubic-hausdorff.ts:13-15` claim tangents are preserved but `cubicToQuadratic` is called with `preserveTangents` false, making the `undefined` branch (line 87/88) dead. Line 44 references non-existent `toQuadraticFromCubic`.

66. `cubic-to-angles-and-speeds.ts:10-11` says degrees (they are radians); `cubic-from-angles-and-speeds.ts:13-19` documents seven positional params for a single object param.

68. `eTangentAt1` doc (`tangent-at-1-exact.ts:9-11`) says `t === 0`; dd/e normal docs (`dd-normal-at-0.ts:7-8`, `dd-normal-at-1.ts:7-8`, `e-normal.ts:8-9`) say they return the derivative; `dd-curvature.ts:44` and `e-curvature.ts:15` show expansion inputs for double inputs; `κ` doc (`curvature.ts:30`) says "Alias for [[κ]]"; `evaluate-2nd-derivative.ts:11` and exact sibling say "cubic" but accept 0-3; `clone.ts:3` says "cubic"; `eval-de-casteljau-error.ts:101,103` inner counter annotations wrong.

69. Misc: `get-bounding-hull.ts:17` has `@dox mdx` (typo, doc generator skips it). `get-implicit-form3-error-counters.ts:9` references form 1. `from-power-basis.ts:12` example has `3t^3` for `3t`. `error-analysis.ts:2,5,8` says "round-of". `get-ab2.ts:15-18` comment describes the opposite of the intentional logic. `get-endpoint-intersections.ts:37` "psB.length should equal psB.length"; `orderAlreadyReduced` param undocumented. `get-transform-2.ts:23` "occured". `is-cubic-obtuse.ts:9-11` says ∠P2 for ∠P3. `x.ts:105-122` says midpoint of `ri`; it's `ri1.t`. `classify.ts:289-293` describes a removed pre-filter. `is-cubic-really-quad.ts:17` says order 0-3 but requires 4 points. `cubic-to-quadratic.ts:15-16` "(and not coincident)" is wrong. `get-curvature-extrema-e.ts:44` has "TODO - slow - just for testing" on a public documented function. `bezier-self-intersection.ts:37` says "or higher order" but silently truncates. `split-by-deviation-from-straight-line-cubic.ts:23` describes a quadratic. `quadratic-to-polyline.ts:12` example is a cubic. `generate-quarter-circle.ts:16-18` stale "could be more accurate" note. `get-interface-rotation.ts:19-20` says double, uses double-double. `from-to-incl-error-bound.ts:38` point case returns `[[0]]` not `[[0,0]]`. `from-to-3-incl-error-bound.ts:293,303` `_xC3xB` uses rounded magnitude; `_x3`/`_y3` never defined. `closest-point-on-bezier-certified.ts:38-39` has `lb`/`ub` undocumented (the two foot-point files are fixed). `furthest-point-on-bezier.ts:51,63` says "minimum"/`minP`. `get-medial-point-coeffs-bez2-same-curve.ts:11` and dd sibling `:18` have a `//` line inside the JSDoc block. `evaluate-implicit*.ts` docs say "vₓ, vₓ, v". `get-implicit-form2-dd-with-running-error.ts:151,162` `w2_` double-counts the factor 2 (safe but 2x loose). `get-implicit-form3-with-running-error.ts:87-94` uses `2*` for double products (safe but inconsistent); `to-power-basis-with-running-error.ts:60,91` comment says `3*abs(xc)` should be `abs(xc)`. `get-implicit-form3.ts:57-59` associates `tq2*b2*b3` differently from all siblings (last-bit differences). `get-coeffs-bez3-bez3-dd.ts:426` vs `:449` `zd_`/`zg_` inconsistent; `:169` uses signed `$c3c3`. `get-coeffs-bez3-bez2-dd.ts` and `get-coeffs-bez3-bez1-dd.ts` define `c0c1_` and `_c0c1` identically (obscures convention). `globals.d.ts` unreachable from tsconfig, imports from outside rootDir, declares unused `GlobalThis` interface.

---

## Efficiency

75. `src/intersection/get-endpoint-intersections/get-endpoint-intersections.ts:39-42` — `getAB(psA,psB)` and `getAB(psB,psA)` each do four exact power-basis conversions and four bigint transforms; the second is the inverse of the first. `getABs` array is re-allocated per call. `get-ab2.ts:13,29` computes `toPowerBasisExact(psA)` twice and creates a closure per call.

76. `src/simultaneous-properties/closest-and-furthest-point-on-bezier/root-interval-to-distance-squared-interval.ts:36-51` — Allocates expansions for four corners to produce a double with a `(1±eps)` bound; the commented-out double version suffices and is allocation-free. Worth doing together with item 23.

77. `src/simultaneous-properties/closest-distance-between-beziers/closest-points-between-beziers.ts:85` — Sorts a 4-element array to read the minimum.

78. `src/implicit-form/double/get-implicit-form3-with-running-error.ts:114-124` and dd sibling (`:156-166,183-195`) — Six subtractions plus `abs` recomputed a few lines later. Trivial.

---

## Checked and clean

- `tsc --noEmit` passes with no diagnostics.
- `src/index.ts` has 240 exports, no duplicates, all targets exist, and every identifier the README mentions is exported.
- The three curvature-extrema cubic polynomial variants, all medial-point polynomials, `fromTo1/2/3`, `elevateDegree`, the angles-and-speeds round trip, and every implicit-form variant were numerically verified against the built output.
- `src/__pycache__` is untracked and gitignored.
- Non-TS files tracked under src that look intentional: `get-medial-points/get-medial-points.md`, `get-coefficients/double-double/error-bound-calc.txt`, `intersection/error-analysis-double.txt`, `intersection/error-analysis-double-double.txt`.
