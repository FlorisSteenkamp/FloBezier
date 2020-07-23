---
id: "_to_power_basis_get_ddy_"
title: "to-power-basis/get-ddy"
sidebar_label: "to-power-basis/get-ddy"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-ddy"](_to_power_basis_get_ddy_.md)

## Index

### Functions

* [getDdy](_to_power_basis_get_ddy_.md#getddy)

## Functions

###  getDdy

▸ **getDdy**(`ps`: number[][]): *number[]*

*Defined in [src/to-power-basis/get-ddy.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-ddy.ts#L15)*

Returns the 2nd derivative of the power basis representation of a line,
quadratic or cubic bezier's y-coordinates.

This function is memoized on its points parameter by object reference.

Bitlength: If the coordinates of the control points are grid-aligned then
max bitlength increase === max shift === 6 (for cubics)
max bitlength increase === max shift === 3 (for quadratics)
max bitlength increase === max shift === 0 (for lines)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[]*
