---
id: "_local_properties_at_t_ds_"
title: "local-properties-at-t/ds"
sidebar_label: "local-properties-at-t/ds"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/ds"](_local_properties_at_t_ds_.md)

## Index

### Functions

* [ds](_local_properties_at_t_ds_.md#ds)

## Functions

###  ds

▸ **ds**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/ds.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/ds.ts#L12)*

Returns ds for a linear, quadratic or cubic bezier curve. This function is
curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The parameter value  |

**Returns:** *number*

▸ **ds**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/ds.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/ds.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`t`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |
