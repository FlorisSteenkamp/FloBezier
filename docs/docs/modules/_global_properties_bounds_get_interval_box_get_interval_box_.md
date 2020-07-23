---
id: "_global_properties_bounds_get_interval_box_get_interval_box_"
title: "global-properties/bounds/get-interval-box/get-interval-box"
sidebar_label: "global-properties/bounds/get-interval-box/get-interval-box"
---

[flo-bezier3](../globals.md) › ["global-properties/bounds/get-interval-box/get-interval-box"](_global_properties_bounds_get_interval_box_get_interval_box_.md)

## Index

### Variables

* [abs](_global_properties_bounds_get_interval_box_get_interval_box_.md#const-abs)
* [u](_global_properties_bounds_get_interval_box_get_interval_box_.md#const-u)

### Functions

* [getIntervalBox](_global_properties_bounds_get_interval_box_get_interval_box_.md#getintervalbox)
* [getIntervalBox1](_global_properties_bounds_get_interval_box_get_interval_box_.md#getintervalbox1)
* [getIntervalBox2](_global_properties_bounds_get_interval_box_get_interval_box_.md#getintervalbox2)
* [getIntervalBox3](_global_properties_bounds_get_interval_box_get_interval_box_.md#getintervalbox3)
* [getIntervalBoxExactT](_global_properties_bounds_get_interval_box_get_interval_box_.md#getintervalboxexactt)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/global-properties/bounds/get-interval-box/get-interval-box.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-interval-box/get-interval-box.ts#L5)*

___

### `Const` u

• **u**: *number* = Number.EPSILON / 2

*Defined in [src/global-properties/bounds/get-interval-box/get-interval-box.ts:4](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-interval-box/get-interval-box.ts#L4)*

## Functions

###  getIntervalBox

▸ **getIntervalBox**(`ps`: number[][], `ts`: number[]): *number[][]*

*Defined in [src/global-properties/bounds/get-interval-box/get-interval-box.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-interval-box/get-interval-box.ts#L18)*

Returns the approximate bezier curve that is the curve from t1 to t2 in such
a way that the control points axis-aligned-box of the newly returned curve is
guaranteed to engulf the true (numerically exact) curve control points
axis-aligned box.
* **precondition** t1 < t2

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | an order 1,2 or 3 bezier curve |
`ts` | number[] | - |

**Returns:** *number[][]*

___

###  getIntervalBox1

▸ **getIntervalBox1**(`__namedParameters`: [any, any], `__namedParameters`: [number, number]): *number[][]*

*Defined in [src/global-properties/bounds/get-interval-box/get-interval-box.ts:268](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-interval-box/get-interval-box.ts#L268)*

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [any, any] |
`__namedParameters` | [number, number] |

**Returns:** *number[][]*

___

###  getIntervalBox2

▸ **getIntervalBox2**(`__namedParameters`: [any, any, any], `__namedParameters`: [number, number]): *number[][]*

*Defined in [src/global-properties/bounds/get-interval-box/get-interval-box.ts:164](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-interval-box/get-interval-box.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [any, any, any] |
`__namedParameters` | [number, number] |

**Returns:** *number[][]*

___

###  getIntervalBox3

▸ **getIntervalBox3**(`__namedParameters`: [any, any, any, any], `__namedParameters`: [number, number]): *number[][]*

*Defined in [src/global-properties/bounds/get-interval-box/get-interval-box.ts:36](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-interval-box/get-interval-box.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [any, any, any, any] |
`__namedParameters` | [number, number] |

**Returns:** *number[][]*

___

###  getIntervalBoxExactT

▸ **getIntervalBoxExactT**(`ps`: number[][], `t`: number): *number[][]*

*Defined in [src/global-properties/bounds/get-interval-box/get-interval-box.ts:341](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-interval-box/get-interval-box.ts#L341)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`t` | number |

**Returns:** *number[][]*
