---
id: "_simultaneous_properties_closest_point_on_bezier_closest_point_on_bezier_"
title: "simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier"
sidebar_label: "simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier"
---

[flo-bezier3](../globals.md) › ["simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier"](_simultaneous_properties_closest_point_on_bezier_closest_point_on_bezier_.md)

## Index

### Variables

* [estimate](_simultaneous_properties_closest_point_on_bezier_closest_point_on_bezier_.md#const-estimate)

### Functions

* [closestPointOnBezier](_simultaneous_properties_closest_point_on_bezier_closest_point_on_bezier_.md#closestpointonbezier)
* [closestPointOnBezierPrecise](_simultaneous_properties_closest_point_on_bezier_closest_point_on_bezier_.md#closestpointonbezierprecise)

## Variables

### `Const` estimate

• **estimate**: *[eEstimate](_intersection_self_intersection_self_intersection_.md#eestimate)* = eEstimate

*Defined in [src/simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier.ts#L11)*

## Functions

###  closestPointOnBezier

▸ **closestPointOnBezier**(`ps`: number[][], `p`: number[]): *object*

*Defined in [src/simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier.ts:61](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`p` | number[] |

**Returns:** *object*

* **p**: *number[]*

* **t**: *number*

___

###  closestPointOnBezierPrecise

▸ **closestPointOnBezierPrecise**(`ps`: number[][], `p`: number[]): *object*

*Defined in [src/simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier.ts:21](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier.ts#L21)*

Returns the closest point on the bezier to the given point - returns the point
and the t value.
* this function also acts as an excellent inversion formula.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`p` | number[] |   |

**Returns:** *object*

* **p**: *number[]*

* **t**: *number*
