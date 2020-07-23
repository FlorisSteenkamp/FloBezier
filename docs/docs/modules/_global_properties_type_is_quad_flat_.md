---
id: "_global_properties_type_is_quad_flat_"
title: "global-properties/type/is-quad-flat"
sidebar_label: "global-properties/type/is-quad-flat"
---

[flo-bezier3](../globals.md) › ["global-properties/type/is-quad-flat"](_global_properties_type_is_quad_flat_.md)

## Index

### Functions

* [isQuadFlat](_global_properties_type_is_quad_flat_.md#isquadflat)

## Functions

###  isQuadFlat

▸ **isQuadFlat**(`ps`: number[][], `tolerance`: number): *boolean*

*Defined in [src/global-properties/type/is-quad-flat.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-quad-flat.ts#L13)*

Returns true if the given quadratic bezier curve is acute (see isQuadObtuse)
and can be approximated with a line segment with maximum Hausdorff distance
<= the given tolerance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A quadratic bezier curve.  |
`tolerance` | number | - |

**Returns:** *boolean*
