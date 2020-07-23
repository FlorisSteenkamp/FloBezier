---
id: "_local_properties_at_t_normal_"
title: "local-properties-at-t/normal"
sidebar_label: "local-properties-at-t/normal"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/normal"](_local_properties_at_t_normal_.md)

## Index

### Functions

* [normal](_local_properties_at_t_normal_.md#normal)

## Functions

###  normal

▸ **normal**(`ps`: number[][], `t`: number): *number[]*

*Defined in [src/local-properties-at-t/normal.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/normal.ts#L12)*

Returns the normal vector of a cubic bezier curve at a specific t. This
function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The parameter value where the normal should be evaluated  |

**Returns:** *number[]*

▸ **normal**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/normal.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/normal.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`t`: number): *number[]*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |
