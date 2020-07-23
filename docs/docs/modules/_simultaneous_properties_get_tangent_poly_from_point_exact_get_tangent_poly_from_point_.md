---
id: "_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_"
title: "simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point"
sidebar_label: "simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point"
---

[flo-bezier3](../globals.md) › ["simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point"](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md)

## Index

### Variables

* [qaq](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#const-qaq)
* [qdifq](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#const-qdifq)
* [qm2](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#const-qm2)
* [qm4](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#const-qm4)
* [qmd](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#const-qmd)
* [qmn2](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#const-qmn2)
* [tp](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#const-tp)

### Functions

* [getPolyForCubicExact](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#getpolyforcubicexact)
* [getPolyForLineExact](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#getpolyforlineexact)
* [getPolyForQuadraticExact](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#getpolyforquadraticexact)
* [getTangentPolyFromPointExact](_simultaneous_properties_get_tangent_poly_from_point_exact_get_tangent_poly_from_point_.md#gettangentpolyfrompointexact)

## Variables

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L6)*

___

### `Const` qdifq

• **qdifq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L10)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L8)*

___

### `Const` qm4

• **qm4**: *ddMultBy4* = ddMultBy4

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L11)*

___

### `Const` qmd

• **qmd**: *[ddMultDouble2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdouble2)* = ddMultDouble2

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L7)*

___

### `Const` qmn2

• **qmn2**: *ddMultByNeg2* = ddMultByNeg2

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L9)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L5)*

## Functions

###  getPolyForCubicExact

▸ **getPolyForCubicExact**(`ps`: number[][], `p`: number[]): *number[][]*

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:40](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L40)*

* **precondition** coefficients of curve and point bit-aligned bitlength <= 46

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`p` | number[] |   |

**Returns:** *number[][]*

___

###  getPolyForLineExact

▸ **getPolyForLineExact**(`ps`: number[][], `p`: number[]): *number[][]*

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:211](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L211)*

* **precondition** coefficients of curve and point bit-aligned bitlength <= 49

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`p` | number[] |   |

**Returns:** *number[][]*

___

###  getPolyForQuadraticExact

▸ **getPolyForQuadraticExact**(`ps`: number[][], `p`: number[]): *number[][]*

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:150](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L150)*

* **precondition** coefficients of curve and point bit-aligned bitlength <= 49

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`p` | number[] |   |

**Returns:** *number[][]*

___

###  getTangentPolyFromPointExact

▸ **getTangentPolyFromPointExact**(`ps`: number[][], `p`: number[]): *number[][]*

*Defined in [src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts:24](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point.ts#L24)*

Returns the polynomial whose roots are all the t values on the given bezier
curve such that the line from the given point to the point on the bezier
evaluated at t is tangent to the bezier at t.
* **precondition** coefficients of curve and point bit-aligned bitlength <= 46
* the resulting coefficients are guaranteed to have max bitlength 106 (so it
can fit in a double-double)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve given by its control points. |
`p` | number[] |   |

**Returns:** *number[][]*
