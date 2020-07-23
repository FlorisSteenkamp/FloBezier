---
id: "_simultaneous_properties_get_interface_ccw_"
title: "simultaneous-properties/get-interface-ccw"
sidebar_label: "simultaneous-properties/get-interface-ccw"
---

[flo-bezier3](../globals.md) › ["simultaneous-properties/get-interface-ccw"](_simultaneous_properties_get_interface_ccw_.md)

## Index

### Variables

* [_bez_debug_](_simultaneous_properties_get_interface_ccw_.md#let-_bez_debug_)
* [orient2d](_simultaneous_properties_get_interface_ccw_.md#const-orient2d)

### Functions

* [getInterfaceCcw](_simultaneous_properties_get_interface_ccw_.md#getinterfaceccw)

## Variables

### `Let` _bez_debug_

• **_bez_debug_**: *[BezDebug](../classes/_debug_debug_.bezdebug.md)*

*Defined in [src/simultaneous-properties/get-interface-ccw.ts:2](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-interface-ccw.ts#L2)*

___

### `Const` orient2d

• **orient2d**: *[orient2d](_simultaneous_properties_get_interface_ccw_.md#const-orient2d)* = orient2d_

*Defined in [src/simultaneous-properties/get-interface-ccw.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-interface-ccw.ts#L11)*

## Functions

###  getInterfaceCcw

▸ **getInterfaceCcw**(`psI`: number[][], `psO`: number[][]): *number*

*Defined in [src/simultaneous-properties/get-interface-ccw.ts:55](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/get-interface-ccw.ts#L55)*

Returns a positive value if the second bezier (of order 1, 2 or 3) curves
anti-clockwise with respect to the first at the point where the first bezier
ends and the second one starts. Returns a negative number if the turn is
clockwise. Returns 0 otherwise.

The algorithm is a generalization of ccw, a.k.a orient2d.

The above obviously necessitates that their endpoints coincide as described.

Preconditions (for robustness):
* The beziers has control points with max bit-length of 25 and bit-aligned.
* The bezier does not have infinite curvature at either endpoint

This is so the vectors between control points can be
calculated exactly without resorting to adaptive infinite precision floating
point operations. Note: aligned to 'grid' here means if you bitwise-and all
values together the resulting bitlength === the max bithlength of any value.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`psI` | number[][] | The incoming bezier that ends at the interface |
`psO` | number[][] | The outgoing bezier that starts at the interface  |

**Returns:** *number*
