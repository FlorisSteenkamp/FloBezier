---
id: "_transformation_degree_or_type_to_quad_from_cubic_"
title: "transformation/degree-or-type/to-quad-from-cubic"
sidebar_label: "transformation/degree-or-type/to-quad-from-cubic"
---

[flo-bezier3](../globals.md) › ["transformation/degree-or-type/to-quad-from-cubic"](_transformation_degree_or_type_to_quad_from_cubic_.md)

## Index

### Variables

* [edif](_transformation_degree_or_type_to_quad_from_cubic_.md#const-edif)
* [estimate](_transformation_degree_or_type_to_quad_from_cubic_.md#const-estimate)
* [sce](_transformation_degree_or_type_to_quad_from_cubic_.md#const-sce)
* [ts](_transformation_degree_or_type_to_quad_from_cubic_.md#const-ts)

### Functions

* [toQuadraticFromCubic](_transformation_degree_or_type_to_quad_from_cubic_.md#toquadraticfromcubic)

## Variables

### `Const` edif

• **edif**: *[eDiff](_implicit_form_exact_get_implicit_form1_.md#ediff)* = eDiff

*Defined in [src/transformation/degree-or-type/to-quad-from-cubic.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/degree-or-type/to-quad-from-cubic.ts#L6)*

___

### `Const` estimate

• **estimate**: *[eEstimate](_intersection_self_intersection_self_intersection_.md#eestimate)* = eEstimate

*Defined in [src/transformation/degree-or-type/to-quad-from-cubic.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/degree-or-type/to-quad-from-cubic.ts#L7)*

___

### `Const` sce

• **sce**: *[scaleExpansion](_intersection_bezier_intersection_implicit_inversion_old_.md#scaleexpansion)* = scaleExpansion

*Defined in [src/transformation/degree-or-type/to-quad-from-cubic.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/degree-or-type/to-quad-from-cubic.ts#L5)*

___

### `Const` ts

• **ts**: *twoSum* = twoSum

*Defined in [src/transformation/degree-or-type/to-quad-from-cubic.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/degree-or-type/to-quad-from-cubic.ts#L8)*

## Functions

###  toQuadraticFromCubic

▸ **toQuadraticFromCubic**(`ps`: number[][]): *number[][]*

*Defined in [src/transformation/degree-or-type/to-quad-from-cubic.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/degree-or-type/to-quad-from-cubic.ts#L20)*

Returns a quadratic closest to the given cubic bezier by taking the midpoint
of the moving line of the hybrid quadratic version of the cubic as the
new quadratics middle control point.
* the resulting quadratic will be exactly the cubic if the cubic is really
a quadratic in disguise and the bit-aligned bitlength of the coordinates of
the control points <= 52.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | a cubic bezier curve.  |

**Returns:** *number[][]*
