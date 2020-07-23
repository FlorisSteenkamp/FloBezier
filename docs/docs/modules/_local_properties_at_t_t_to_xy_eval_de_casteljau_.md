---
id: "_local_properties_at_t_t_to_xy_eval_de_casteljau_"
title: "local-properties-at-t/t-to-xy/eval-de-casteljau"
sidebar_label: "local-properties-at-t/t-to-xy/eval-de-casteljau"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-xy/eval-de-casteljau"](_local_properties_at_t_t_to_xy_eval_de_casteljau_.md)

## Index

### Functions

* [evalDeCasteljau](_local_properties_at_t_t_to_xy_eval_de_casteljau_.md#evaldecasteljau)
* [evalDeCasteljauX](_local_properties_at_t_t_to_xy_eval_de_casteljau_.md#evaldecasteljaux)
* [evalDeCasteljauY](_local_properties_at_t_t_to_xy_eval_de_casteljau_.md#evaldecasteljauy)

## Functions

###  evalDeCasteljau

▸ **evalDeCasteljau**(`ps`: number[][], `t`: number): *number[]*

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau.ts#L7)*

Evaluates the given bezier curve at the parameter t.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The parameter value where the bezier should be evaluated  |

**Returns:** *number[]*

___

###  evalDeCasteljauX

▸ **evalDeCasteljauX**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau.ts:65](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau.ts#L65)*

Evaluates the given bezier curve at the parameter t.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The parameter value where the bezier should be evaluated  |

**Returns:** *number*

___

###  evalDeCasteljauY

▸ **evalDeCasteljauY**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau.ts:105](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau.ts#L105)*

Evaluates the given bezier curve at the parameter t.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The parameter value where the bezier should be evaluated  |

**Returns:** *number*
