---
id: "_to_power_basis_get_dy_"
title: "to-power-basis/get-dy"
sidebar_label: "to-power-basis/get-dy"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-dy"](_to_power_basis_get_dy_.md)

## Index

### Variables

* [fes](_to_power_basis_get_dy_.md#const-fes)
* [sum](_to_power_basis_get_dy_.md#const-sum)
* [td](_to_power_basis_get_dy_.md#const-td)
* [tp](_to_power_basis_get_dy_.md#const-tp)

### Functions

* [getDy](_to_power_basis_get_dy_.md#getdy)
* [getDyExact](_to_power_basis_get_dy_.md#getdyexact)

## Variables

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/to-power-basis/get-dy.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dy.ts#L7)*

___

### `Const` sum

• **sum**: *[eSum](_intersection_bezier_intersection_implicit_inversion_old_.md#esum)* = eSum

*Defined in [src/to-power-basis/get-dy.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dy.ts#L8)*

___

### `Const` td

• **td**: *[twoDiff](_intersection_bezier_intersection_implicit_inversion_old_.md#twodiff)* = twoDiff

*Defined in [src/to-power-basis/get-dy.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dy.ts#L9)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/to-power-basis/get-dy.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dy.ts#L6)*

## Functions

###  getDy

▸ **getDy**(`ps`: number[][]): *number[]*

*Defined in [src/to-power-basis/get-dy.ts:23](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dy.ts#L23)*

Returns the derivative of the power basis representation of a line, quadratic
or cubic bezier's y-coordinates.

**bitlength**: If the coordinates of the control points are bit-aligned then
max bitlength increase === max shift === 5 (for cubics)
max bitlength increase === max shift === 3 (for quadratics)
max bitlength increase === max shift === 1 (for lines)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[]*

___

###  getDyExact

▸ **getDyExact**(`ps`: number[][]): *number[][]*

*Defined in [src/to-power-basis/get-dy.ts:63](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dy.ts#L63)*

Returns the derivative of the power basis representation of a line, quadratic
or cubic bezier's y-coordinates.

Bitlength: If the coordinates of the control points are grid-aligned then
max bitlength increase === max shift === 5 (for cubics)
max bitlength increase === max shift === 3 (for quadratics)
max bitlength increase === max shift === 1 (for lines)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[][]*
