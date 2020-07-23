---
id: "_local_properties_at_t_curvature_"
title: "local-properties-at-t/curvature"
sidebar_label: "local-properties-at-t/curvature"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/curvature"](_local_properties_at_t_curvature_.md)

## Index

### Variables

* [edif](_local_properties_at_t_curvature_.md#const-edif)
* [epr](_local_properties_at_t_curvature_.md#const-epr)
* [fes](_local_properties_at_t_curvature_.md#const-fes)
* [sign](_local_properties_at_t_curvature_.md#const-sign)
* [tp](_local_properties_at_t_curvature_.md#const-tp)

### Functions

* [compareCurvaturesAtInterface](_local_properties_at_t_curvature_.md#comparecurvaturesatinterface)
* [κ](_local_properties_at_t_curvature_.md#κ)

## Variables

### `Const` edif

• **edif**: *[eDiff](_implicit_form_exact_get_implicit_form1_.md#ediff)* = eDiff

*Defined in [src/local-properties-at-t/curvature.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/curvature.ts#L16)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/local-properties-at-t/curvature.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/curvature.ts#L14)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/local-properties-at-t/curvature.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/curvature.ts#L15)*

___

### `Const` sign

• **sign**: *[eSign](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#esign)* = eSign

*Defined in [src/local-properties-at-t/curvature.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/curvature.ts#L17)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/local-properties-at-t/curvature.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/curvature.ts#L13)*

## Functions

###  compareCurvaturesAtInterface

▸ **compareCurvaturesAtInterface**(`psI`: number[][], `psO`: number[][]): *number*

*Defined in [src/local-properties-at-t/curvature.ts:70](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/curvature.ts#L70)*

Compare the curvature, κ, between two curves at t === 0.

Returns a positive number if κ for psI > κ for psO, negative if κ for psI < κ
for psO or zero if the curve extensions are identical (i.e. in same K-family).

Precondition: The point psI evaluated at zero must === the point psO
evaluated at zero.

Exact: Returns the exact result if the bithlength of all
coordinates <= 53 - 5 === 48 and are bit-aligned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`psI` | number[][] | An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] representing the incoming curve |
`psO` | number[][] | Another bezier representing the outgoing curve  |

**Returns:** *number*

___

###  κ

▸ **κ**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/curvature.ts:29](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/curvature.ts#L29)*

Returns the curvature, κ, at a specific t.

This function is curried.

Alias of curvature.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The parameter value where the curvature should be evaluated  |

**Returns:** *number*

▸ **κ**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/curvature.ts:30](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/curvature.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`t`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |
