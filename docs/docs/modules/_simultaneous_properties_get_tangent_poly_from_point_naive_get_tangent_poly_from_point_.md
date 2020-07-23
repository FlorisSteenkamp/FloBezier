---
id: "_simultaneous_properties_get_tangent_poly_from_point_naive_get_tangent_poly_from_point_"
title: "simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point"
sidebar_label: "simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point"
---

[flo-bezier3](../globals.md) › ["simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point"](_simultaneous_properties_get_tangent_poly_from_point_naive_get_tangent_poly_from_point_.md)

## Index

### Functions

* [getPolyForCubic](_simultaneous_properties_get_tangent_poly_from_point_naive_get_tangent_poly_from_point_.md#getpolyforcubic)
* [getPolyForLine](_simultaneous_properties_get_tangent_poly_from_point_naive_get_tangent_poly_from_point_.md#getpolyforline)
* [getPolyForQuadratic](_simultaneous_properties_get_tangent_poly_from_point_naive_get_tangent_poly_from_point_.md#getpolyforquadratic)
* [getTangentPolyFromPoint](_simultaneous_properties_get_tangent_poly_from_point_naive_get_tangent_poly_from_point_.md#gettangentpolyfrompoint)

## Functions

###  getPolyForCubic

▸ **getPolyForCubic**(`ps`: number[][], `p`: number[]): *number[]*

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`p` | number[] |

**Returns:** *number[]*

___

###  getPolyForLine

▸ **getPolyForLine**(`ps`: number[][], `p`: number[]): *number[]*

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point.ts:126](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`p` | number[] |

**Returns:** *number[]*

___

###  getPolyForQuadratic

▸ **getPolyForQuadratic**(`ps`: number[][], `p`: number[]): *number[]*

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point.ts:85](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`p` | number[] |

**Returns:** *number[]*

___

###  getTangentPolyFromPoint

▸ **getTangentPolyFromPoint**(`ps`: number[][], `p`: number[]): *number[]*

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point.ts#L9)*

Returns the polynomial whose roots are all the t values on the given bezier
curve such that the line from the given point to the point on the bezier
evaluated at t is tangent to the bezier at t.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve given by its control points. |
`p` | number[] |   |

**Returns:** *number[]*
