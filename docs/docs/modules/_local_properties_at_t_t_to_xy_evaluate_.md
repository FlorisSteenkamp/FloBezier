---
id: "_local_properties_at_t_t_to_xy_evaluate_"
title: "local-properties-at-t/t-to-xy/evaluate"
sidebar_label: "local-properties-at-t/t-to-xy/evaluate"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-xy/evaluate"](_local_properties_at_t_t_to_xy_evaluate_.md)

## Index

### Variables

* [abs](_local_properties_at_t_t_to_xy_evaluate_.md#const-abs)
* [calculate](_local_properties_at_t_t_to_xy_evaluate_.md#const-calculate)
* [epr](_local_properties_at_t_t_to_xy_evaluate_.md#const-epr)
* [fes](_local_properties_at_t_t_to_xy_evaluate_.md#const-fes)
* [sum](_local_properties_at_t_t_to_xy_evaluate_.md#const-sum)
* [tp](_local_properties_at_t_t_to_xy_evaluate_.md#const-tp)
* [u](_local_properties_at_t_t_to_xy_evaluate_.md#const-u)

### Functions

* [evaluate](_local_properties_at_t_t_to_xy_evaluate_.md#evaluate)
* [evaluateExact](_local_properties_at_t_t_to_xy_evaluate_.md#evaluateexact)
* [expEvaluateExact](_local_properties_at_t_t_to_xy_evaluate_.md#expevaluateexact)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L12)*

___

### `Const` calculate

• **calculate**: *[eCalculate](_implicit_form_exact_get_implicit_form3_.md#ecalculate)* = eCalculate

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L9)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L7)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L8)*

___

### `Const` sum

• **sum**: *[eSum](_intersection_bezier_intersection_implicit_inversion_old_.md#esum)* = eSum

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L10)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L6)*

___

### `Const` u

• **u**: *number* = Number.EPSILON / 2

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L13)*

## Functions

###  evaluate

▸ **evaluate**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:24](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L24)*

Evaluates the given bezier curve at the parameter t. This function is
curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A line, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |

**Returns:** *function*

The resultant point.

▸ (`t`: number): *number[]*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t` | number | The parameter value where the bezier should be evaluated |

▸ **evaluate**(`ps`: number[][], `t`: number): *number[]*

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:25](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`t` | number |

**Returns:** *number[]*

___

###  evaluateExact

▸ **evaluateExact**(`ps`: number[][], `t`: number): *number[][]*

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:67](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`t` | number |

**Returns:** *number[][]*

___

###  expEvaluateExact

▸ **expEvaluateExact**(`ps`: number[][][], `t`: number): *number[][]*

*Defined in [src/local-properties-at-t/t-to-xy/evaluate.ts:133](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][][] |
`t` | number |

**Returns:** *number[][]*
