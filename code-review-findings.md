# Code review findings — src/ (2026-10-10)

Consolidated review of the entire `src` folder. No code was changed. Items are
ranked roughly by impact within each section. Remove items as they are resolved.

All bug items are resolved. Suggested next: the dead-code items below (quick
cleanup that also shrinks the published package).

---

## Improvements

### Dead code and files that ship with the package

(package.json `files` includes `src`)

33. `src/intersection/bezier-bezier-intersection/get-coefficients/double/` — Whole directory unreferenced; two files fully commented out, family incomplete, (item 30's error-bound bugs in `get-coeffs-bez3-bez3.ts` are now fixed). Note: `performance/src/naive/-naive.ts` still imports `get-coeffs-bez3-bez3.ts`. Its error bounds also omit the 2nd order term `γ1*a_*b_` for products of two inexact values (fixed elsewhere as former item 80 - use the `_xEff = _x + γ1*x_` pattern if this directory is revived).

35. `src/intersection/self-intersection/get-coefficients/double/get-coeffs-bez3.ts` and `.../double-double/get-coeffs-bez3-dd.ts` — Neither imported anywhere.

### Structural / API

81. `chooseStableT` (`src/get-medial-points/double/get-medial-points.ts`) treats `|A|` (and `|C|`) as zero below an *absolute* threshold of `Number.EPSILON*max(1, |A|, |B|, |C|, |D|)`, so for very small coordinates valid solutions become `NaN`, e.g. `getMedialPoints([0,0], [1,0], [[4e-17,0]])` gives `[NaN]` instead of `[2e-17]`. The threshold should be relative to the coefficient magnitudes, i.e. without the `1`, or rather use the actual error bound of `A`.

55. Double/dd `getImplicitForm2/3` silently return all zeros for degenerate curves while exact variants fall back to lower degree; undocumented.

56. `tolerance || default` in `closest-points-between-beziers.ts:106`, `hausdorff-distance-one-sided-extra.ts:90` and `quadratic-to-polyline.ts:23` treats an explicit 0 as "use default".

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
