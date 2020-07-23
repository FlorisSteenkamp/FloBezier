---
id: "_from_power_basis_from_power_bases_"
title: "from-power-basis/from-power-bases"
sidebar_label: "from-power-basis/from-power-bases"
---

[flo-bezier3](../globals.md) › ["from-power-basis/from-power-bases"](_from_power_basis_from_power_bases_.md)

## Index

### Functions

* [fromPowerBases](_from_power_basis_from_power_bases_.md#frompowerbases)

## Functions

###  fromPowerBases

▸ **fromPowerBases**(`cs`: number[][]): *number[][]*

*Defined in [src/from-power-basis/from-power-bases.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/from-power-basis/from-power-bases.ts#L11)*

Returns the approximate Bernstein basis representation of a line, quadratic
or cubic bezier's power bases.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`cs` | number[][] | An order 1, 2 or 3 parametric curve in power bases with the x-coordinate coefficients given first as an array representing the polynomial in the parameter from highest to lowest order, e.g. [[1,2,3,4], [5,6,7,8]] represents a cubic parametric curve.  |

**Returns:** *number[][]*
