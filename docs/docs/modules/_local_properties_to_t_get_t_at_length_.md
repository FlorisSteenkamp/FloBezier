---
id: "_local_properties_to_t_get_t_at_length_"
title: "local-properties-to-t/get-t-at-length"
sidebar_label: "local-properties-to-t/get-t-at-length"
---

[flo-bezier3](../globals.md) › ["local-properties-to-t/get-t-at-length"](_local_properties_to_t_get_t_at_length_.md)

## Index

### Functions

* [getTAtLength](_local_properties_to_t_get_t_at_length_.md#gettatlength)

## Functions

###  getTAtLength

▸ **getTAtLength**(`ps`: number[][], `s`: number): *number*

*Defined in [src/local-properties-to-t/get-t-at-length.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-to-t/get-t-at-length.ts#L13)*

Returns the t parameter value where the given cubic bezier reaches the given
length, s, starting from t = 0. This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`s` | number | The length  |

**Returns:** *number*

▸ **getTAtLength**(`ps`: number[][]): *function*

*Defined in [src/local-properties-to-t/get-t-at-length.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-to-t/get-t-at-length.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`s`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`s` | number |
