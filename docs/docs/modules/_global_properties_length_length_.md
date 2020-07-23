---
id: "_global_properties_length_length_"
title: "global-properties/length/length"
sidebar_label: "global-properties/length/length"
---

[flo-bezier3](../globals.md) › ["global-properties/length/length"](_global_properties_length_length_.md)

## Index

### Functions

* [length](_global_properties_length_length_.md#length)
* [length1](_global_properties_length_length_.md#length1)
* [length2](_global_properties_length_length_.md#length2)
* [length3](_global_properties_length_length_.md#length3)

## Functions

###  length

▸ **length**(`interval`: number[], `ps`: number[][]): *number*

*Defined in [src/global-properties/length/length.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/length/length.ts#L12)*

Returns the curve (linear, quadratic or cubic bezier) length in the specified
interval. This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`interval` | number[] | The paramter interval over which the length is to be calculated (often === [0,1]).  |
`ps` | number[][] | A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |

**Returns:** *number*

▸ **length**(`interval`: number[]): *function*

*Defined in [src/global-properties/length/length.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/length/length.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`interval` | number[] |

**Returns:** *function*

▸ (`ps`: number[][]): *number*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

___

###  length1

▸ **length1**(`interval`: number[], `ps`: number[][]): *number*

*Defined in [src/global-properties/length/length.ts:107](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/length/length.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`interval` | number[] |
`ps` | number[][] |

**Returns:** *number*

___

###  length2

▸ **length2**(`interval`: number[], `ps`: number[][]): *number*

*Defined in [src/global-properties/length/length.ts:95](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/length/length.ts#L95)*

Returns the curve length in the specified interval. This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`interval` | number[] | The paramter interval over which the length is to be calculated (often === [0,1]).  |
`ps` | number[][] | A quadratic bezier, e.g. [[0,0],[1,1],[2,1]] |

**Returns:** *number*

___

###  length3

▸ **length3**(`interval`: number[], `ps`: number[][]): *number*

*Defined in [src/global-properties/length/length.ts:33](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/length/length.ts#L33)*

Returns the curve length in the specified interval. This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`interval` | number[] | The paramter interval over which the length is to be calculated (often === [0,1]).  |
`ps` | number[][] | A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |

**Returns:** *number*
