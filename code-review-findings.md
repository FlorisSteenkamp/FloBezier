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


## Checked and clean

- `tsc --noEmit` passes with no diagnostics.
- `src/index.ts` has 240 exports, no duplicates, all targets exist, and every identifier the README mentions is exported.
- The three curvature-extrema cubic polynomial variants, all medial-point polynomials, `fromTo1/2/3`, `elevateDegree`, the angles-and-speeds round trip, and every implicit-form variant were numerically verified against the built output.
- `src/__pycache__` is untracked and gitignored.
- Non-TS files tracked under src that look intentional: `get-medial-points/get-medial-points.md`, `get-coefficients/double-double/error-bound-calc.txt`, `intersection/error-analysis-double.txt`, `intersection/error-analysis-double-double.txt`.
