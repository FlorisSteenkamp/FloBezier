---
id: "_local_properties_at_t_t_to_ddxy_evaluate_ddy_"
title: "local-properties-at-t/t-to-ddxy/evaluate-ddy"
sidebar_label: "local-properties-at-t/t-to-ddxy/evaluate-ddy"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-ddxy/evaluate-ddy"](_local_properties_at_t_t_to_ddxy_evaluate_ddy_.md)

## Index

### Functions

* [evaluateDdy](_local_properties_at_t_t_to_ddxy_evaluate_ddy_.md#evaluateddy)

## Functions

###  evaluateDdy

▸ **evaluateDdy**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/t-to-ddxy/evaluate-ddy.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-ddxy/evaluate-ddy.ts#L13)*

Returns the y value of the twice differentiated (with respect to t) cubic
bezier when evaluated at t. This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The t parameter |

**Returns:** *number*

▸ **evaluateDdy**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/t-to-ddxy/evaluate-ddy.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-ddxy/evaluate-ddy.ts#L14)*

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
