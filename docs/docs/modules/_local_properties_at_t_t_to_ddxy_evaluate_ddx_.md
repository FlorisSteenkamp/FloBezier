---
id: "_local_properties_at_t_t_to_ddxy_evaluate_ddx_"
title: "local-properties-at-t/t-to-ddxy/evaluate-ddx"
sidebar_label: "local-properties-at-t/t-to-ddxy/evaluate-ddx"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-ddxy/evaluate-ddx"](_local_properties_at_t_t_to_ddxy_evaluate_ddx_.md)

## Index

### Functions

* [evaluateDdx](_local_properties_at_t_t_to_ddxy_evaluate_ddx_.md#evaluateddx)

## Functions

###  evaluateDdx

▸ **evaluateDdx**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/t-to-ddxy/evaluate-ddx.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-ddxy/evaluate-ddx.ts#L13)*

Returns the x value of the twice differentiated (with respect to t) cubic
bezier when evaluated at t. This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The t parameter |

**Returns:** *number*

▸ **evaluateDdx**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/t-to-ddxy/evaluate-ddx.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-ddxy/evaluate-ddx.ts#L14)*

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
