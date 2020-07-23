---
id: "_to_power_basis_get_y_"
title: "to-power-basis/get-y"
sidebar_label: "to-power-basis/get-y"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-y"](_to_power_basis_get_y_.md)

## Index

### Variables

* [sum](_to_power_basis_get_y_.md#const-sum)
* [td](_to_power_basis_get_y_.md#const-td)
* [ts](_to_power_basis_get_y_.md#const-ts)

### Functions

* [getY](_to_power_basis_get_y_.md#gety)
* [getYExact](_to_power_basis_get_y_.md#getyexact)

## Variables

### `Const` sum

• **sum**: *[eSum](_intersection_bezier_intersection_implicit_inversion_old_.md#esum)* = eSum

*Defined in [src/to-power-basis/get-y.ts:4](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-y.ts#L4)*

___

### `Const` td

• **td**: *[twoDiff](_intersection_bezier_intersection_implicit_inversion_old_.md#twodiff)* = twoDiff

*Defined in [src/to-power-basis/get-y.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-y.ts#L6)*

___

### `Const` ts

• **ts**: *twoSum* = twoSum

*Defined in [src/to-power-basis/get-y.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-y.ts#L5)*

## Functions

###  getY

▸ **getY**(`ps`: number[][]): *number[]*

*Defined in [src/to-power-basis/get-y.ts:30](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-y.ts#L30)*

Returns the approximate power basis representation of a line, quadratic or
cubic bezier's y-coordinates.

If certain preconditions are met (see below) it returns the exact result.

This function is memoized on its points parameter by object reference.

Returns the power basis polynomial from highest power to lowest,
e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]

Bitlength: If the coordinates of the control points are grid-aligned then
max bitlength increase === max shift === 4 (for cubics)
(due to 'multiplication' by 9 (3x 6x 3x)
max bitlength increase === max shift === 2 (for quadratics)
(due to 'multiplication' by 4 (1x 2x 1x)
max bitlength increase === max shift === 1 (for lines)
(due to 'multiplication' by 4 (1x 1x)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[]*

___

###  getYExact

▸ **getYExact**(`ps`: number[][]): *number[][]*

*Defined in [src/to-power-basis/get-y.ts:56](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-y.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *number[][]*
