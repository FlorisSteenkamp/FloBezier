---
id: "_global_properties_type_is_self_overlapping_"
title: "global-properties/type/is-self-overlapping"
sidebar_label: "global-properties/type/is-self-overlapping"
---

[flo-bezier3](../globals.md) › ["global-properties/type/is-self-overlapping"](_global_properties_type_is_self_overlapping_.md)

## Index

### Functions

* [isMonotone](_global_properties_type_is_self_overlapping_.md#ismonotone)
* [isMonotoneDecreasing](_global_properties_type_is_self_overlapping_.md#ismonotonedecreasing)
* [isMonotoneIncreasing](_global_properties_type_is_self_overlapping_.md#ismonotoneincreasing)
* [isSelfOverlapping](_global_properties_type_is_self_overlapping_.md#isselfoverlapping)

## Functions

###  isMonotone

▸ **isMonotone**(`xs`: number[]): *boolean*

*Defined in [src/global-properties/type/is-self-overlapping.ts:52](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-self-overlapping.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`xs` | number[] |

**Returns:** *boolean*

___

###  isMonotoneDecreasing

▸ **isMonotoneDecreasing**(`xs`: number[]): *boolean*

*Defined in [src/global-properties/type/is-self-overlapping.ts:42](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-self-overlapping.ts#L42)*

Returns true if the given array of numbers are non-strict monotone decreasing.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xs` | number[] | An array of numbers  |

**Returns:** *boolean*

___

###  isMonotoneIncreasing

▸ **isMonotoneIncreasing**(`xs`: number[]): *boolean*

*Defined in [src/global-properties/type/is-self-overlapping.ts:28](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-self-overlapping.ts#L28)*

Returns true if the given array of numbers are non-strict monotone increasing.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xs` | number[] | An array of numbers  |

**Returns:** *boolean*

___

###  isSelfOverlapping

▸ **isSelfOverlapping**(`ps`: number[][]): *boolean*

*Defined in [src/global-properties/type/is-self-overlapping.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-self-overlapping.ts#L14)*

Returns true if the given bezier is a line and self-overlapping, i.e. if it
intersects itself at an infinite number of points.

Note: A bezier curve can only intersect itself at an infinite number of
points if is a self-overlapping line.

Robust: This function is robust via adaptive infinite precision floating
point arithmetic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve  |

**Returns:** *boolean*
