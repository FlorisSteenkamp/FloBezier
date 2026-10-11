# Code review findings — src/ (2026-10-10)

Consolidated review of the entire `src` folder. No code was changed. Items are
ranked roughly by impact within each section. Remove items as they are resolved.

Suggested order: items 1–8 and 16–25 first (change results or break certified
bounds), then 31–37 (quick cleanup that also shrinks the published package).

---

## Bugs

### Error bounds that are not actually bounds

(results stay correct except in near-degenerate cases, where "certified" claims fail)

24. `src/intersection/circle-bezier-intersection/circle-bezier-intersection.ts:59` — `2*e` drops the Stewart error counter (up to 9 for cubics) that the convention requires; bound is under-stated by 2x to 4.5x. Git history shows it was `γγ6*e` before the switch to `roots`.

26. `src/global-properties/bounds/get-interval-box/get-interval-box.ts:194-198` and `get-interval-box-dd.ts:428-432` — Uses counters 8/5/2 where `evalDeCasteljauError` documents 9/6/3. Could just call `evalDeCasteljauWithErr`.

27. `src/transformation/split/from-to-incl-error-bound.ts:9-10` — Public JSDoc says multiply by `8u` for cubics, but one-sided splits produce `<9>` counters and the internal consumer uses `9u`.

28. `src/global-properties/classification/is-quad-really-line.ts:35,47` — Fast filter `abs(w) - w_ > 0` is never true because `u` was never applied. Results stay correct but every collinear quad takes the slow exact path.

29. `src/global-properties/bounds/get-interval-box/get-interval-box-dd.ts:366-379` — Line variant scales with `u` while quad/cubic use `uu`; the dd box for lines is 2^52 times looser than intended.

---

## Improvements

### Dead code and files that ship with the package

(package.json `files` includes `src`)

33. `src/intersection/bezier-bezier-intersection/get-coefficients/double/` — Whole directory unreferenced; two files fully commented out, family incomplete, (item 30's error-bound bugs in `get-coeffs-bez3-bez3.ts` are now fixed). Note: `performance/src/naive/-naive.ts` still imports `get-coeffs-bez3-bez3.ts`. Its error bounds also omit the 2nd order term `γ1*a_*b_` for products of two inexact values (fixed elsewhere as former item 80 - use the `_xEff = _x + γ1*x_` pattern if this directory is revived).

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

---

## Efficiency

75. `src/intersection/get-endpoint-intersections/get-endpoint-intersections.ts:39-42` — `getAB(psA,psB)` and `getAB(psB,psA)` each do four exact power-basis conversions and four bigint transforms; the second is the inverse of the first. `getABs` array is re-allocated per call. `get-ab2.ts:13,29` computes `toPowerBasisExact(psA)` twice and creates a closure per call.

77. `src/simultaneous-properties/closest-distance-between-beziers/closest-points-between-beziers.ts:85` — Sorts a 4-element array to read the minimum.

78. `src/implicit-form/double/get-implicit-form3-with-running-error.ts:114-124` and dd sibling (`:156-166,183-195`) — Six subtractions plus `abs` recomputed a few lines later. Trivial.

---

## Checked and clean

- `tsc --noEmit` passes with no diagnostics.
- `src/index.ts` has 240 exports, no duplicates, all targets exist, and every identifier the README mentions is exported.
- The three curvature-extrema cubic polynomial variants, all medial-point polynomials, `fromTo1/2/3`, `elevateDegree`, the angles-and-speeds round trip, and every implicit-form variant were numerically verified against the built output.
- `src/__pycache__` is untracked and gitignored.
- Non-TS files tracked under src that look intentional: `get-medial-points/get-medial-points.md`, `get-coefficients/double-double/error-bound-calc.txt`, `intersection/error-analysis-double.txt`, `intersection/error-analysis-double-double.txt`.
