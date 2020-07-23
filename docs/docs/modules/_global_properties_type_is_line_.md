---
id: "_global_properties_type_is_line_"
title: "global-properties/type/is-line"
sidebar_label: "global-properties/type/is-line"
---

[flo-bezier3](../globals.md) › ["global-properties/type/is-line"](_global_properties_type_is_line_.md)

## Index

### Variables

* [orient2d](_global_properties_type_is_line_.md#orient2d)

### Functions

* [isHorizontalLine](_global_properties_type_is_line_.md#ishorizontalline)
* [isLine](_global_properties_type_is_line_.md#isline)
* [isVerticalLine](_global_properties_type_is_line_.md#isverticalline)

## Variables

###  orient2d

• **orient2d**: *[orient2d](_simultaneous_properties_get_interface_ccw_.md#const-orient2d)*

*Defined in [src/global-properties/type/is-line.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-line.ts#L5)*

## Functions

###  isHorizontalLine

▸ **isHorizontalLine**(`ps`: number[][]): *boolean*

*Defined in [src/global-properties/type/is-line.ts:43](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-line.ts#L43)*

Returns true if the given bezier degenerates to a horizontal line (possibly
self-overlapping)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve.  |

**Returns:** *boolean*

___

###  isLine

▸ **isLine**(`ps`: number[][]): *boolean*

*Defined in [src/global-properties/type/is-line.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-line.ts#L15)*

Returns true if the given bezier is a line or a line in diguise, i.e. if all
control points are collinear.

Robust: Robust for any bitlength of the given coordinates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve.  |

**Returns:** *boolean*

___

###  isVerticalLine

▸ **isVerticalLine**(`ps`: number[][]): *boolean*

*Defined in [src/global-properties/type/is-line.ts:60](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-line.ts#L60)*

Returns true if the given bezier degenerates to a vertical line (possibly
self-overlapping)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve.  |

**Returns:** *boolean*
