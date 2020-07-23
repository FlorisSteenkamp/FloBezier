---
id: "_global_properties_type_is_quad_obtuse_"
title: "global-properties/type/is-quad-obtuse"
sidebar_label: "global-properties/type/is-quad-obtuse"
---

[flo-bezier3](../globals.md) › ["global-properties/type/is-quad-obtuse"](_global_properties_type_is_quad_obtuse_.md)

## Index

### Functions

* [isQuadObtuse](_global_properties_type_is_quad_obtuse_.md#isquadobtuse)

## Functions

###  isQuadObtuse

▸ **isQuadObtuse**(`ps`: number[][]): *boolean*

*Defined in [src/global-properties/type/is-quad-obtuse.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-quad-obtuse.ts#L13)*

Returns true if the given quadratic bezier is obtuse, false otherwise (i.e.
false if acute).
Obtuse here is defined as follows: Let the quad form a triangle through its
control points P0, P1, P2 where P0 and P2 are the endpoints. If both interior
angles ∠P0 and ∠P2 are <= 90 degrees then the quad is considered acute,
otherwise it is considered obtuse.

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *boolean*
